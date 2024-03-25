import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Room } from './room.schema';
import { User } from './user.schema';

@Schema({ versionKey: false, timestamps: true })
export class Message {
  @Prop()
  message: string;

  @Prop({ ref: 'Room', type: SchemaTypes.ObjectId })
  room: Room;

  @Prop({ ref: 'User', type: SchemaTypes.ObjectId })
  sender: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
