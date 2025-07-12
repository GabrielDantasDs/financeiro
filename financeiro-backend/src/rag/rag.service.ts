import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-rag.dto';
import { UpdateRagDto } from './dto/update-rag.dto';
import { MessageService } from 'src/message.service';
import { SqlDatabase } from 'langchain/sql_db';
import { DataSource } from 'typeorm';
import { ChatPromptTemplate } from '@langchain/core/prompts';

@Injectable()
export class RagService {
  private messageService: MessageService;
  constructor() {
    this.messageService = new MessageService();
  }

  async initChat(CreateMessageDto: CreateMessageDto) {
    const response = await this.messageService.processMessage(CreateMessageDto);
    return response;
  }

  findAll() {
    return `This action returns all rag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rag`;
  }

  update(id: number, updateRagDto: UpdateRagDto) {
    return `This action updates a #${id} rag`;
  }

  remove(id: number) {
    return `This action removes a #${id} rag`;
  }
}
