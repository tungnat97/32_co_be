import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { Collections } from '../../common/collections';
import { Item } from '../../order/entities/order.entity';

@Schema({ collection: Collections.CART, timestamps: true })
export class Cart {
  _id: string;

  @IsString()
  @Prop({ required: true })
  sessionId: string;

  @IsString()
  @Prop({ required: true })
  customerId: string;

  @ValidateNested({ each: true })
  @Type(() => Item)
  @Prop({ required: true, unique: true })
  items: Item[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
CartSchema.index({ customerId: 1, sessionId: 1 }, { unique: true });
