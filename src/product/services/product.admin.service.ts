import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collections } from '../../common/collections';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductAdminService {
  constructor(
    @InjectModel(Collections.PRODUCT)
    private readonly productModel: Model<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = new this.productModel(dto);
    return product.save();
  }

  async findAll(page: number | string = 1, limit: number | string = 10) {
    const p = Math.max(1, Number(page) || 1);
    const l = Math.max(1, Math.min(100, Number(limit) || 10)); // cap to 100
    const skip = (p - 1) * l;

    const [items, total] = await Promise.all([
      this.productModel.find().skip(skip).limit(l).exec(),
      this.productModel.countDocuments().exec(),
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

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
