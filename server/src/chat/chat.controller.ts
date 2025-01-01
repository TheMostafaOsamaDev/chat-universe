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
  getChat(@Query() query: GetChatDto, @Req() req: Request) {
    return this.chatService.getChat({
      userChattingWithId: query.userChattingWithId,
      userId: req.user._id,
    });
  }

  @Get('/all')
  getAllUsers(@Req() req: Request) {
    return this.chatService.getAllChats(req.user._id || '');
  }

  @Get('search')
  searchUsers(@Query('value') value: string, @Req() req: Request) {
    return this.chatService.searchUsers(value, req.user._id);
  }

  @Get('/user/:id')
  @ApiResponse({ type: GetUserInfoDto })
  async getUser(@Param('id') id: string): Promise<GetUserInfoDto> {
    return await this.chatService.getUser(id);
  }
}
