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
    console.log(client);
  }

  handleDisconnect(client: any) {}

  @SubscribeMessage('newMessage')
  test(@MessageBody() data: any) {
    console.log(data);
    return 'Hello World!';
  }
}
