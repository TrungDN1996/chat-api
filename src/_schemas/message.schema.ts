import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { ObjectId } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Message {
  @Prop({ ref: 'Chat', type: SchemaTypes.ObjectId })
  chat_id: ObjectId;

  @Prop({ ref: 'User', type: SchemaTypes.ObjectId })
  sender_id: ObjectId;

  @Prop()
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
