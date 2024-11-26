import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('search')
  searchUsers(@Query('value') value: string) {
    return this.chatService.searchUsers(value);
  }

  @Get('/user/:id')
  @ApiResponse({ type: GetUserInfoDto })
  async getUser(@Query('id') id: string): Promise<GetUserInfoDto> {
    return await this.chatService.getUser(id);
  }
}
