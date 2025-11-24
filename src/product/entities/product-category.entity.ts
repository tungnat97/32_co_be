import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Collections } from '../../common/collections';
import { IsString } from 'class-validator';

@Schema({ collection: Collections.PRODUCT_CATEGORY, timestamps: true })
export class ProductCategory {
  /**
   * Id of the product category
   * @example "prod_cat_123456"
   */
  _id: string;

  /**
   * Name of the product category
   * @example "Electronics"
   */
  @Prop({ required: true, unique: true })
  @IsString()
  name: string;

  /**
   * Description of the product category
   * @example "Category for electronic products and gadgets."
   */
  @Prop()
  @IsString()
  description: string;

  /**
   * Indicates if the category is active
   * @example true
   */
  @Prop({ default: true })
  isActive: boolean;
}

export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);
