import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { authProviders } from 'src/auth/auth.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ChatGateway, ChatService, ...authProviders],
  controllers: [ChatController],
})
export class ChatModule {}
