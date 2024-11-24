import { Controller, Get, Query } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  @Get('search')
  searchUsers(@Query('value') value: string) {
    console.log(value);
    return 'search users';
  }
}
