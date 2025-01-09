import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetChatDto } from './dto/get-chat.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { chatDiskStorageConfig } from 'src/config/upload-avatar.config';

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
    return this.chatService.getAllChats(req.user._id);
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

  @Post('send-message')
  @UseInterceptors(FileInterceptor('files', chatDiskStorageConfig))
  async sendMessage(@UploadedFiles() files: Express.Multer.File) {
    console.log(files);
  }
}
