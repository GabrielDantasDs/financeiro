import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageService } from './message.service';
import { ChatService } from './rag/chat.service';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway(3001, {})
export default class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private messageService: MessageService,
    private chatService: ChatService,
    private configService: ConfigService,
  ) {
    this.chatService = new ChatService(configService);
  }
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket): void {
    this.server.emit('room', client.id + ' joined!');
  }

  handleDisconnect(@ConnectedSocket() client: Socket): void {
    this.server.emit('room', client.id + ' left!');
  }

  @SubscribeMessage('events')
  async handleEvents(@MessageBody() data: any) {
    await this.chatService.initChat();
    console.log(data)
    const response = await this.chatService.processMessage(data.text, data.clientId);

    this.server.emit('events', response);
  }
}
