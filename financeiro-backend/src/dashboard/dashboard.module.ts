import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ClientService } from 'src/client/client.service';
import { UnauthorizedExceptionFilter } from '../filters/exceptions/http/http-unauthorized.filter';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, ClientService]
})

export class DashboardModule {}
