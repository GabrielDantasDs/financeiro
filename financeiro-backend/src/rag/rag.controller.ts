import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-rag.dto';
import { UpdateRagDto } from './dto/update-rag.dto';
import EventsGateway from 'src/events.gateway';
import { Response } from 'express';
import { ChatService } from './chat.service';
import { ConfigService } from '@nestjs/config';

@Controller('chat')
export class RagController {
  chat: any;
  constructor(
    private chatService: ChatService,
    private configSerivce: ConfigService,
  ) {
    this.chatService = new ChatService(this.configSerivce);
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Res() res: Response) {
    const response = await this.chatService.processMessage(createMessageDto.text, '0');

    return response;
  }
}
