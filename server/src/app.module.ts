import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    CacheModule.register({ isGlobal: true }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
