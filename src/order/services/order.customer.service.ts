import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collections } from '../../common/collections';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Product } from '../../product/entities/product.entity';
import { ReqUserDto } from '../../auth/dto/response/req-user.dto';

@Injectable()
export class OrderCustomerService {
  constructor(
    @InjectModel(Collections.ORDER)
    private readonly orderModel: Model<Order>,
    @InjectModel(Collections.PRODUCT)
    private readonly productModel: Model<Product>,
  ) {}

  async createOrder(customer: ReqUserDto, data: CreateOrderDto) {
    // This should be placed in a transaction in a real-world scenario
    const mapProduct = await this.productModel
      .find({
        _id: { $in: data.items.map((item) => item.productId) },
      })
      .then((res) => new Map(res.map((prod) => [prod._id.toString(), prod])));
    let totalPrice = 0;
    for (const item of data.items) {
      // Verify that stock quantity is enough for order
      const product = mapProduct.get(item.productId);
      if (product === undefined) {
        throw new BadRequestException(
          `Product ${item.productId} does not exist`,
        );
      }
      if (product.stockQuantity < item.quantity) {
        throw new BadRequestException(
          `Product ${product.name} does not have enough stock`,
        );
      }
      totalPrice += product.price * item.quantity;
    }
    // Create order
    const order = new this.orderModel({
      ...data,
      customerId: customer.id,
      timestamp: new Date(),
      totalPrice,
    });
    const savedOrder = await order.save();
    // Decrease stock quantity
    for (const item of data.items) {
      await this.productModel.updateOne(
        { _id: item.productId },
        { $inc: { stockQuantity: -item.quantity } },
      );
    }
    return savedOrder;
  }

  async findAll(customer: ReqUserDto, page: number = 1, limit: number = 10) {
    const p = Math.max(1, Math.floor(page));
    const l = Math.max(1, Math.floor(limit));
    const condition = { customerId: customer.id };

    const [total, data] = await Promise.all([
      this.orderModel.countDocuments(condition).exec(),
      this.orderModel
        .find(condition)
        .sort({ timestamp: -1 })
        .skip((p - 1) * l)
        .limit(l)
        .exec(),
    ]);

    const totalPages = Math.ceil(total / l);

    return { data, total, page: p, limit: l, totalPages };
  }
}
