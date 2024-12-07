import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetChatDto } from './dto/get-chat.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Request } from 'express';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getChat(@Query() query: GetChatDto) {
    return this.chatService.getChat(query);
  }

  @Get('/all')
  getAllUsers(@Req() req: Request) {
    console.log(req.user);
    return this.chatService.getAllChats();
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

  @UseGuards(JwtAuthGuard)
  @Get('status')
  getStatus() {
    return { status: 'ok' };
  }
}
