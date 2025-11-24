import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Collections } from '../../common/collections';
import { IsNumber, IsString } from 'class-validator';

@Schema({ collection: Collections.PRODUCT, timestamps: true })
export class Product {
  /**
   * ID of the product
   * @example "64a1f0c2b4d1c2e5f6a7b8c9"
   */
  _id: string;

  /**
   * Name of the product
   * @example "Wireless Mouse"
   */
  @Prop({ required: true })
  @IsString()
  name: string;

  /**
   * Description of the product
   * @example "A high-precision wireless mouse with ergonomic design."
   */
  @Prop()
  @IsString()
  description: string;

  /**
   * Price of the product
   * @example 29.99
   */
  @Prop({ required: true })
  @IsNumber()
  price: number;

  /**
   * Stock quantity of the product
   * @example 150
   */
  @Prop({ required: true, default: 0 })
  @IsNumber()
  stockQuantity: number;

  /**
   * Category ID of the product
   * @example "64a1f0c2b4d1c2e5f6a7b8c9"
   */
  @Prop({
    type: Types.ObjectId,
    ref: Collections.PRODUCT_CATEGORY,
    required: true,
  })
  categoryId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
