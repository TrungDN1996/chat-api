import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/module/users/users.service';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TokenDto } from './dto/token.dto';
import { IUser } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<TokenDto> {
    const user = await this.validateUser(
      loginUserDto.username,
      loginUserDto.password,
    );

    if (user) {
      const payload = {
        email: user.email,
        sub: user._id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

  async register(createUserDto: CreateUserDto): Promise<TokenDto> {
    const user = await this.usersService.findOne(createUserDto.email);
    if (user) {
      throw new HttpException(
        'User with this email exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const createOne = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    if (createOne) {
      const payload = {
        email: createOne.email,
        sub: createOne._id ,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
