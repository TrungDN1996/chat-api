import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/_schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { IMessage } from './entities/message.entity';

export class MessagesRepository {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<IMessage>,
  ) {}

  async create(message: CreateMessageDto): Promise<IMessage> {
    const createMessage = new this.messageModel(message);
    return await createMessage.save();
  }

  async findAllByRoomId(id: string): Promise<IMessage[]> {
    return await this.messageModel.find({ room: { $all: [id] } })
      .populate('room')
      .populate('sender')
      .exec();
  }
}
