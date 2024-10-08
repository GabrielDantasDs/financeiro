import { Injectable } from '@nestjs/common';
import { CreateFinancialTransactionDto } from './dto/create-financial_transaction.dto';
import { UpdateFinancialTransactionDto } from './dto/update-financial_transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinancialTransaction } from './entities/financial_transaction.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class FinancialTransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFinancialTransactionDto: CreateFinancialTransactionDto) {
    const { number_installments, ...data } = createFinancialTransactionDto;

    const financial_transaction =
      await this.prisma.financial_transaction.create({
        data: data,
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

  async update(id: number, updateFinancialTransactionDto: UpdateFinancialTransactionDto) {
    const { number_installments, ...data } = updateFinancialTransactionDto;

    return this.prisma.financial_transaction.update({
      where: { id },
      data: data,
    });
  }

  markedPaid(
    id: number,
    updateFinancialTransactionDto: UpdateFinancialTransactionDto,
  ) {
    return this.prisma.financial_transaction.update({
      where: { id },
      data: {
        payed: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.financial_transaction.delete({ where: { id } });
  }
}
