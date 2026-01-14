import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [ChatService, ConfigService],
})
export class RagModule {}
