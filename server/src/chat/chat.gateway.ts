import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { UseGuards } from '@nestjs/common';
import { WsGatewayGuard } from 'src/guards/ws-gateway.guard';
import { ApiTags } from '@nestjs/swagger';
import { Server, Socket } from 'socket.io';
import { WebSocketErrorUtil } from 'src/utils/websocket-error.util';

@ApiTags('chat')
@WebSocketGateway(8080, {
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: ['Authorization'],
  },
})
@UseGuards(WsGatewayGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

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

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const message = await this.chatService.createMessage(body);

      this.server.emit('savedMessage', message);
    } catch (error) {
      WebSocketErrorUtil.handleError(
        client,
        body.userId,
        error,
        "Can't send message",
      );
    }
  }
}
