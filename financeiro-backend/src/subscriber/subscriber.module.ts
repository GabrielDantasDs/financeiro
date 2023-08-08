import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SubscriberController],
  providers: [SubscriberService, PrismaService],
  imports: [PrismaModule]
})
export class SubscriberModule {}
