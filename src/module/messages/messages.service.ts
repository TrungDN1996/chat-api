import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesRepository } from './messages.repository';
import { IMessage } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}
  
  async create(createMessageDto: CreateMessageDto): Promise<IMessage> {
    return await this.messagesRepository.create(createMessageDto);
  }

  async findAllByRoomId(id: string): Promise<IMessage[]> {
    return await this.messagesRepository.findAllByRoomId(id);
  }
}
