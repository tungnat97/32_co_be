import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Collections } from '../../common/collections';

@Schema({ collection: Collections.PRODUCT_CATEGORY, timestamps: true })
export class ProductCategory extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);
