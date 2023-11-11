import { Module } from '@nestjs/common';
import { FinancialTransactionService } from './financial_transaction.service';
import { FinancialTransactionController } from './financial_transaction.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InstallmentsService } from 'src/installments/installments.service';

@Module({
  imports: [PrismaModule],
  controllers: [FinancialTransactionController],
  providers: [FinancialTransactionService, PrismaService, InstallmentsService]
})
export class FinancialTransactionModule {}
