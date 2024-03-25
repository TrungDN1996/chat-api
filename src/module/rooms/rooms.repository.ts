import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from 'src/_schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';

export class RoomsRepository {
  constructor(
    @InjectModel('Room')
    private roomModel: Model<Room>,
  ) {}

  async create(room: CreateRoomDto): Promise<Room> {
    const createRoom = new this.roomModel(room);
    return await createRoom.save();
  }

  async findAllByUserId(id: string): Promise<Room[]> {
    return await this.roomModel.find({ members: { $all: [id] } });
  }
}
