import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    return this.chatService.changeUserStatus(client.id, false, client.id);
  }

  @SubscribeMessage('userConnected')
  userConnected(client: any, @MessageBody() userId: string) {
    console.log(client);
  }

  // @SubscribeMessage('changeStatus')
  // changeStatus(@MessageBody() data: { userId: string; isOnline: boolean }) {
  //   console.log(data);
  //   return this.chatService.changeUserStatus(data.userId, data.isOnline);
  // }
}
