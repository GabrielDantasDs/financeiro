import { Module } from '@nestjs/common';
import { FinancialTransactionService } from './financial_transaction.service';
import { FinancialTransactionController } from './financial_transaction.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ClienteService } from 'src/cliente/cliente.service';

@Module({
  controllers: [FinancialTransactionController],
  providers: [FinancialTransactionService, PrismaService, ClienteService]
})
export class FinancialTransactionModule {}
