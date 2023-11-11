import { Module } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { InstallmentsController } from './installments.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InstallmentsController],
  providers: [InstallmentsService, PrismaService]
})
export class InstallmentsModule {}
