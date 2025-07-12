import { Module } from '@nestjs/common';
import { FinancialTransactionService } from './financial_transaction.service';
import { RecurringFinancialTransactionService } from './recurring_financial_transaction.service';
import { FinancialTransactionController } from './financial_transaction.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryService } from 'src/category/category.service';
import { AgentService } from 'src/rag/agent.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot()],
  controllers: [FinancialTransactionController],
  providers: [FinancialTransactionService, RecurringFinancialTransactionService, PrismaService, CategoryService, AgentService]
})
export class FinancialTransactionModule {}
