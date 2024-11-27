import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { UseGuards } from '@nestjs/common';
import { WsGatewayGuard } from 'src/guards/ws-gateway.guard';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
@UseGuards(WsGatewayGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: any) {
    const user = await this.chatService.changeUserStatus(
      client.id,
      false,
      client.id,
    );

    this.server.emit('changeUserStatus', {
      ...user?.toJSON(),
      isOnline: false,
    });
  }

  @SubscribeMessage('userConnected')
  async userConnected(@MessageBody() body: any) {
    this.server.emit('changeUserStatus', {
      ...body,
      isOnline: true,
    });

    return await this.chatService.changeUserStatus(
      body.userId,
      true,
      body.socketId,
    );
  }
}
