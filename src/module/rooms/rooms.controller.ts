import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('rooms')
@Controller('api/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The chat has been successfully created.',
  })
  async create(@Body() createChatDto: CreateRoomDto) {
    return await this.roomsService.create(createChatDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-user/:id')
  async getAllByUserId(@Param('id') id: string) {
    return await this.roomsService.findAllByUserId(id);
  }
}
