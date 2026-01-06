import { Module } from '@nestjs/common';
import { RagController } from './rag.controller';
import { ChatService } from './chat.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [RagController],
  providers: [ChatService, ConfigService],
})
export class RagModule {}
