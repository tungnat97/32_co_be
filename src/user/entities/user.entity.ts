import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collections } from '../../common/collections';
import { UserRole } from '../common/user.enum';
import { Document } from 'mongoose';

@Schema({ collection: Collections.USER, timestamps: true })
export class User {
  _id: string;

  /**
   * Username of the user
   * @example "john_doe"
   */
  @Prop({ required: true, unique: true })
  username: string;

  /**
   * Email address of the user
   * @example email@gmail.com
   */
  @Prop({ required: true, unique: true })
  email: string;

  /**
   * Hashed password of the user
   * @example "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6LhY5Pq7vH7kYlG2"
   */
  @Prop({ required: true })
  password: string;

  /**
   * Role of the user
   * @example "customer"
   */
  @Prop({ enum: Object.values(UserRole), type: String, required: true })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = Document & User;
