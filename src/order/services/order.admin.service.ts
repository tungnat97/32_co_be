import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Collections } from '../../common/collections';
import { Order } from '../entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderAdminService {
  constructor(
    @InjectModel(Collections.ORDER)
    private readonly orderModel: Model<Order>,
  ) {}

  async findAll(page: number = 1, limit: number = 10) {
    const p = Math.max(1, Math.floor(page));
    const l = Math.max(1, Math.floor(limit));

    const [total, data] = await Promise.all([
      this.orderModel.countDocuments().exec(),
      this.orderModel
        .find()
        .sort({ timestamp: -1 })
        .skip((p - 1) * l)
        .limit(l)
        .exec(),
    ]);

    const totalPages = Math.ceil(total / l);

    return { data, total, page: p, limit: l, totalPages };
  }
}
