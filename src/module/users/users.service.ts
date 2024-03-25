import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(user: CreateUserDto): Promise<IUser> {
    return await this.usersRepository.create(user);
  }

  async findOne(username: string): Promise<IUser> {
    return await this.usersRepository.findOne(username);
  }

  async findAll(): Promise<IUser[]> {
    return await this.usersRepository.findAll();
  }
}
