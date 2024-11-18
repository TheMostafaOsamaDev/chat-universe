import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database.providers';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
