import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageService } from './message.service';
import { RagService } from './rag/rag.service';

@WebSocketGateway(3001, {})
export default class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private messageService: MessageService, private ragService:RagService) {}
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
    console.log(data)
    const response = await this.ragService.create(data);
    this.server.emit("events", response)
  }
}
