import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from '../auth/dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(username: string): Promise<any> {
    return this.usersRepository.findOne(username);
  }

  async createOne(user: RegisterUserDto): Promise<any> {
    const createOne = await this.usersRepository.createOne(user);
    return createOne;
  }

  async findAll(): Promise<any> {
    return this.usersRepository.findAll();
  }
}
