import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(username: string): Promise<any> {
    return this.usersRepository.findOne(username);
  }

  async createOne(user: any): Promise<any> {
    const createOne = await this.usersRepository.createOne(user);
    return createOne;
  }
}
