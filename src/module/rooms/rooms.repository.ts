import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { IRoom } from './entities/room.entity';

export class RoomsRepository {
  constructor(
    @InjectModel('Room')
    private roomModel: Model<IRoom>,
  ) {}

  async create(room: CreateRoomDto): Promise<IRoom> {
    const createRoom = new this.roomModel(room);
    return await createRoom.save();
  }

  async findById(id: string): Promise<IRoom> {
    return await this.roomModel.findById(id);
  }

  async findAllByUserId(id: string): Promise<IRoom[]> {
    return await this.roomModel.find({ members: { $all: [id] } });
  }
}
