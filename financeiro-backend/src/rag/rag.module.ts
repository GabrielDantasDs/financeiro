import { Module } from '@nestjs/common';
import { RagService } from './rag.service';
import { RagController } from './rag.controller';
import { MessageService } from 'src/message.service';

@Module({
  controllers: [RagController],
  providers: [RagService, MessageService],
})
export class RagModule {}
