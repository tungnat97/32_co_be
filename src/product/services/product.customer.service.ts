import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collections } from '../../common/collections';
import { Product } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductCustomerService {
  constructor(
    @InjectModel(Collections.PRODUCT)
    private readonly productModel: Model<Product>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
    categoryId?: string,
    upperPrice?: number,
    lowerPrice?: number,
  ) {
    const p = Math.max(1, Number(page) || 1);
    const l = Math.max(1, Math.min(100, Number(limit) || 10)); // cap to 100
    const skip = (p - 1) * l;
    const condition = {};
    if (categoryId) {
      Object.assign(condition, { category: categoryId });
    }
    if (upperPrice !== undefined) {
      Object.assign(condition, { price: { $lte: upperPrice } });
    }
    if (lowerPrice !== undefined) {
      Object.assign(condition, { price: { $gte: lowerPrice } });
    }
    const [items, total] = await Promise.all([
      this.productModel.find(condition).skip(skip).limit(l).exec(),
      this.productModel.countDocuments(condition).exec(),
    ]);

    return {
      items,
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l),
    };
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }
}
