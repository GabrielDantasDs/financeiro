import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ClienteService } from '../cliente/cliente.service';
import { MovimentacaoService } from '../movimentacao/movimentacao.service';
import { CaixaService } from '../caixa/caixa.service';
import { UnauthorizedExceptionFilter } from '../filters/exceptions/http/http-unauthorized.filter';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, ClienteService, MovimentacaoService, CaixaService]
})
export class DashboardModule {}
