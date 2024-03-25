import {
  SubscribeMessage,
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { CreateMessageDto } from './module/messages/dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { ForbiddenException, Logger } from '@nestjs/common';
import { MessagesService } from './module/messages/messages.service';
import { IMessage } from './module/messages/entities/message.entity';
import { RoomsService } from './module/rooms/rooms.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messagesService: MessagesService,
    private readonly roomService: RoomsService
    ) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');
  private rooms: Map<string, IMessage[]> = new Map(); // roomId => messages
  private participants: Map<string, string> = new Map(); // clientId => roomId

  handleConnection(client: Socket): void {
    const clientId = client.id;
    this.logger.log(`New connecting... client id: ${clientId}`);
    this.participants.set(clientId, '');
  }

  handleDisconnect(client: Socket): void {
    const clientId = client.id;
    this.logger.log(`Disconnection... socket id: ${clientId}`);
    this.participants.delete(clientId);
  }

  // When new member joins to room
  @SubscribeMessage('participants')
    async onParticipate(client: Socket, roomId: string, userId: string) {
        const clientId = client.id;
        this.logger.log(`Registering new participant... client id: ${clientId} joins to room id: ${roomId}`);

        if (!(await this.roomService.findById(roomId))) {
            this.logger.error('Room with id: %s was not found, disconnecting the participant', roomId);
            client.disconnect();
            throw new ForbiddenException('The access is forbidden');
        }

        this.participants.set(clientId, roomId);

        // when received new participant we notify the chatter by room
        this.server.emit(
            `participants/${roomId}`,
            userId
        );
    }

    // When member sends message inside room
    @SubscribeMessage('messages')
    async onMessage(client: Socket, message: CreateMessageDto): Promise<void> {
        const clientId = client.id;
        this.logger.log(
          'Received new message... socketId: %s, message: ',
          clientId,
          message,
        );

        // Saving received message to database 
        const createMessage = await this.messagesService.create(message);
        const roomId = message.room;
        const messageData = this.rooms.get(roomId);
        messageData.push(createMessage);
        this.rooms.set(roomId, messageData);

        // when received message we notify the chatter by room
        this.server.emit(roomId, message);
    }
}
