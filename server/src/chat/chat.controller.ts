import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('search')
  searchUsers(@Query('value') value: string) {
    return this.chatService.searchUsers(value);
  }
}
