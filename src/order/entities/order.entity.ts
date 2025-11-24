import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Collections } from '../../common/collections';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Item {
  @IsString()
  @Prop({ type: String, required: true, ref: Collections.PRODUCT })
  productId: string;

  @IsNumber()
  @Prop({ type: Number, required: true })
  quantity: number;
}

@Schema({ collection: Collections.ORDER })
export class Order {
  _id: string;

  /** Customer ID associated with the order
   * @example "cust_1234567890"
   */
  @IsString()
  @Prop({ required: true })
  customerId: string;

  /** Items in the order */
  @ApiProperty({ example: [{ productId: 'prod_123456', quantity: 2 }] })
  @ValidateNested({ each: true })
  @Type(() => Item)
  @Prop({ type: [Object], required: true })
  items: Item[];

  /**
   * Total price of the order
   * @example 99.99
   */
  @Prop({ required: true })
  totalPrice: number;

  /**
   * Timestamp of when the order was placed
   * @example "2024-06-15T12:34:56.789Z"
   */
  @Prop({ required: true })
  timestamp: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
