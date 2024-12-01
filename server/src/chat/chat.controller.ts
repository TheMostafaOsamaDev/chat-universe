import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetChatDto } from './dto/get-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getChat(@Query() query: GetChatDto) {
    return this.chatService.getChat(query);
  }

  @Get('search')
  searchUsers(@Query('value') value: string) {
    return this.chatService.searchUsers(value);
  }

  @Get('/user/:id')
  @ApiResponse({ type: GetUserInfoDto })
  async getUser(@Param('id') id: string): Promise<GetUserInfoDto> {
    return await this.chatService.getUser(id);
  }
}
