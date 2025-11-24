import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Collections } from '../../common/collections';
import { Type } from 'class-transformer';

export class Item {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}

@Schema({ collection: Collections.ORDER })
export class Order {
  _id: string;

  @IsString()
  @Prop({ required: true })
  customerId: string;

  @ValidateNested({ each: true })
  @Type(() => Item)
  @Prop({ type: [Object], required: true })
  items: Item[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  timestamp: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
