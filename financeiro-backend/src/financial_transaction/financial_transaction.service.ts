import { Injectable } from '@nestjs/common';
import { CreateFinancialTransactionDto } from './dto/create-financial_transaction.dto';
import { UpdateFinancialTransactionDto } from './dto/update-financial_transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FinancialTransactionService {
  constructor(private readonly prisma: PrismaService) {}
  create(createFinancialTransactionDto: CreateFinancialTransactionDto) {
    return this.prisma.financial_transaction.create({
      data: createFinancialTransactionDto,
    });
  }

  findAll() {
    return this.prisma.financial_transaction.findMany();
  }

  findOne(id: number) {
    return this.prisma.financial_transaction.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  update(
    id: number,
    updateFinancialTransactionDto: UpdateFinancialTransactionDto,
  ) {
    return this.prisma.financial_transaction.update({
      where: { id },
      data: updateFinancialTransactionDto,
    });
  }

  markedPaid(
    id: number,
    updateFinancialTransactionDto: UpdateFinancialTransactionDto,
  ) {
    return this.prisma.financial_transaction.update({
      where: { id },
      data: {
        fin_payed: true
      },
    });
  }

  remove(id: number) {
    return this.prisma.financial_transaction.delete({ where: { id } });
  }
}
