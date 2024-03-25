import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/module/auth/jwt-auth.guard';

@ApiTags('messages')
@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.',
  })
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.create(createMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-room/:id')
  async getAllByRoomId(@Param('id') id: string) {
    return await this.messagesService.findAllByRoomId(id);
  }
}
