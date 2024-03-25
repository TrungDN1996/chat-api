import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsRepository } from './rooms.repository';
import { Room } from 'src/_schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    return await this.roomsRepository.create(createRoomDto);
  }

  async findAllByUserId(id: string): Promise<Room[]> {
    return await this.roomsRepository.findAllByUserId(id);
  }
}
