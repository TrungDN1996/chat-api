import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDo } from 'src/_schemas/user.do';

export class UsersRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDo>,
  ) {}

  async findOne(email: string): Promise<any> {
    const findOne = await this.userModel.findOne({ email: email });
    return findOne;
  }

  async findAll(): Promise<any> {
    const findAll = await this.userModel.find();
    return findAll;
  }

  async createOne(user: any): Promise<any> {
    const createOne = await this.userModel.create(user);
    return createOne;
  }
}
