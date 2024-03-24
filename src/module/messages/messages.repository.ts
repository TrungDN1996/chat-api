import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDo } from 'src/_schemas/message.do';

export class MessagesRepository {
  constructor(
    @InjectModel('Message')
    private messageModel: Model<MessageDo>,
  ) {}

  async createMessage(message: any): Promise<any> {
    const createOne = await this.messageModel.create(message);
    return createOne;
  }

  async findAllMessages(id: string): Promise<any> {
    const findAll = await this.messageModel.find({ chat_id: { $all: [id] } });
    return findAll;
  }
}
