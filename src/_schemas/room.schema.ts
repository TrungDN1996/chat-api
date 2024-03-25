import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from './user.schema';

@Schema({ versionKey: false, timestamps: true })
export class Room {
  @Prop({ ref: 'User', type: [SchemaTypes.ObjectId] })
  members: User[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
