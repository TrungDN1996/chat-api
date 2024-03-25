import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsRepository } from './rooms.repository';
import { IRoom } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async create(createRoomDto: CreateRoomDto): Promise<IRoom> {
    return await this.roomsRepository.create(createRoomDto);
  }

  async findById(id: string): Promise<IRoom> {
    return await this.roomsRepository.findById(id);
  }

  async findAllByUserId(id: string): Promise<IRoom[]> {
    return await this.roomsRepository.findAllByUserId(id);
  }
}
