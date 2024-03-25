import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './entities/user.entity';

export class UsersRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUser>,
  ) {}

  async create(user: CreateUserDto): Promise<IUser> {
    const createUser = new this.userModel(user);
    return await createUser.save();
  }

  async findOne(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email: email });
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find();
  }

  
}
