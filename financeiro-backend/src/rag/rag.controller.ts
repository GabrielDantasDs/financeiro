import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { RagService } from './rag.service';
import { CreateMessageDto } from './dto/create-rag.dto';
import { UpdateRagDto } from './dto/update-rag.dto';
import EventsGateway from 'src/events.gateway';
import { Response } from 'express';
import { MessageService } from 'src/message.service';

@Controller('chat')
export class RagController {
  constructor(private readonly ragService: RagService, private messageService: MessageService) {}

  @Post()
  create(@Body() CreateMessageDto: CreateMessageDto, @Res() res: Response) {
      return this.messageService.processMessage(CreateMessageDto.text);
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
