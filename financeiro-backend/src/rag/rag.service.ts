import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-rag.dto';
import { UpdateRagDto } from './dto/update-rag.dto';
import { ChatInput } from 'rag-dantas';

@Injectable()
export class RagService {
  create(CreateMessageDto: CreateMessageDto) {
    const chatTemplate = new ChatInput();
    chatTemplate.receiveMessage(CreateMessageDto.text);
    return chatTemplate.getInput();
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
