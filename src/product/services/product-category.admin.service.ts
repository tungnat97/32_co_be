import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collections } from '../../common/collections';
import { ProductCategory } from '../entities/product-category.entity';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';

@Injectable()
export class ProductCategoryAdminService {
  constructor(
    @InjectModel(Collections.PRODUCT_CATEGORY)
    private readonly productCategoryModel: Model<ProductCategory>,
  ) {}

  async create(dto: CreateProductCategoryDto) {
    const product = new this.productCategoryModel(dto);
    return product.save();
  }

  async findAll(page: number | string = 1, limit: number | string = 10) {
    const p = Math.max(1, Number(page) || 1);
    const l = Math.max(1, Number(limit) || 10); // cap to 100
    const skip = (p - 1) * l;
    const [items, total] = await Promise.all([
      this.productCategoryModel.find().skip(skip).limit(l).exec(),
      this.productCategoryModel.countDocuments().exec(),
    ]);
    return {
      items,
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l),
    };
  }
}
