import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { RagService } from './rag.service';
import { CreateMessageDto } from './dto/create-rag.dto';
import { UpdateRagDto } from './dto/update-rag.dto';
import EventsGateway from 'src/events.gateway';
import { Response } from 'express';
import { MessageService } from 'src/message.service';
import { ChatService } from './chat.service';
import { ConfigService } from '@nestjs/config';

@Controller('chat')
export class RagController {
  chat: any;
  constructor(
    private readonly ragService: RagService,
    private messageService: MessageService,
    private chatService: ChatService,
    private configSerivce: ConfigService,
  ) {
    this.chatService = new ChatService(this.configSerivce);
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Res() res: Response) {
    const response = await this.chatService.processMessage(createMessageDto.text);

    return response;
  }

  @Get()
  findAll() {
    return this.ragService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ragService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRagDto: UpdateRagDto) {
    return this.ragService.update(+id, updateRagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ragService.remove(+id);
  }
}
