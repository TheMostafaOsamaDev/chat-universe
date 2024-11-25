import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { authProviders } from 'src/auth/auth.providers';
import { DatabaseModule } from 'src/database/database.module';
import { chatProviders } from './chat.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ChatGateway, ChatService, ...authProviders, ...chatProviders],
  controllers: [ChatController],
})
export class ChatModule {}
