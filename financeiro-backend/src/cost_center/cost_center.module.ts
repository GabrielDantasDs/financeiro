import { Module } from '@nestjs/common';
import { CostCenterService } from './cost_center.service';
import { CostCenterController } from './cost_center.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CostCenterController],
  providers: [CostCenterService, PrismaService],
  imports: [PrismaModule]
})
export class CostCenterModule {}
