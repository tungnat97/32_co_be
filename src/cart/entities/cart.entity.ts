import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { Collections } from '../../common/collections';
import { Item } from '../../order/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ collection: Collections.CART, timestamps: true })
export class Cart {
  _id: string;

  /**
   * Session ID associated with the cart
   * @example "sess_1234567890"
   */
  @IsString()
  @Prop({ required: true })
  sessionId: string;

  /** Customer ID associated with the cart
   * @example "cust_1234567890"
   */
  @IsString()
  @Prop({ required: true })
  customerId: string;

  /** Items in the cart */
  @ApiProperty({ example: [{ productId: 'prod_123456', quantity: 2 }] })
  @ValidateNested({ each: true })
  @Type(() => Item)
  @Prop({ required: true, unique: true })
  items: Item[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
CartSchema.index({ customerId: 1, sessionId: 1 }, { unique: true });
