import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFinancialTransactionDto } from './dto/create-financial_transaction.dto';
import { UpdateFinancialTransactionDto } from './dto/update-financial_transaction.dto';

@Injectable()
export class FinancialTransactionService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateFinancialTransactionDto) {
    return this.prisma.financialTransactions.create({ data })
  }

  findAllByCustomer(id: number) {
    return this.prisma.financialTransactions.findMany({
      where: {
        fin_customer_id: id,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.financialTransactions.findFirst({ where: { id } });
  }

  update(id: number, data: UpdateFinancialTransactionDto) {
    return this.prisma.financialTransactions.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.cliente.delete({
      where: {
        id,
      },
    });
  }
}
