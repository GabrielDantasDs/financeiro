import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-rag.dto';

export class UpdateRagDto extends PartialType(CreateMessageDto) {}
