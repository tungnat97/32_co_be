import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collections } from '../../common/collections';
import { Cart } from '../entities/cart.entity';
import { ReqUserDto } from '../../auth/dto/response/req-user.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { GetCartDto } from '../dto/get-cart.dto';

@Injectable()
export class CartCustomerService {
  constructor(
    @InjectModel(Collections.CART)
    private readonly cartModel: Model<Cart>,
  ) {}

  async updateCart(customer: ReqUserDto, data: UpdateCartDto) {
    await this.cartModel.findOneAndUpdate(
      { customerId: customer.id, sessionId: data.sessionId },
      { items: data.items },
      { upsert: true, new: true },
    );
    return this.cartModel.findOne({ customerId: customer.id }).exec();
  }

  async getCartBySession(customer: ReqUserDto, data: GetCartDto) {
    await this.cartModel.findOne({
      customerId: customer.id,
      sessionId: data.sessionId,
    });
    return this.cartModel.findOne({ customerId: customer.id }).exec();
  }
}
