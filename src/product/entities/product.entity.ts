import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Collections } from '../../common/collections';
import { IsNumber, IsString } from 'class-validator';

@Schema({ collection: Collections.PRODUCT, timestamps: true })
export class Product {
  _id: string;

  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop()
  @IsString()
  description: string;

  @Prop({ required: true })
  @IsNumber()
  price: number;

  @Prop({ required: true, default: 0 })
  @IsNumber()
  stockQuantity: number;

  @Prop({
    type: Types.ObjectId,
    ref: Collections.PRODUCT_CATEGORY,
    required: true,
  })
  categoryId: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
