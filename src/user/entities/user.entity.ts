import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collections } from '../../common/collections';
import { UserRole } from '../common/user.enum';
import { Document } from 'mongoose';

@Schema({ collection: Collections.USER, timestamps: true })
export class User {
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Object.values(UserRole), type: String, required: true })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = Document & User;
