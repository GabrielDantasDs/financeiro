import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscriberService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSubscriberDto: CreateSubscriberDto) {
    return this.prisma.subscriber.create({ data: createSubscriberDto });
  }

  findAll() {
    return this.prisma.subscriber.findMany();
  }

  findOne(id: number) {
    return this.prisma.subscriber.findFirstOrThrow({ where: { id: id } });
  }

  update(id: number, updateSubscriberDto: UpdateSubscriberDto) {
    return this.prisma.subscriber.update({
      where: { id: id },
      data: updateSubscriberDto,
    });
  }

  remove(id: number) {
    return this.prisma.subscriber.delete({ where: { id: id } });
  }
}
