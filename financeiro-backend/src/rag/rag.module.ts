import { Module } from '@nestjs/common';
import { RagService } from './rag.service';
import { RagController } from './rag.controller';
import { MessageService } from 'src/message.service';
import { ChatService } from './chat.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [RagController],
  providers: [RagService, MessageService, ChatService, ConfigService],
})
export class RagModule {}
