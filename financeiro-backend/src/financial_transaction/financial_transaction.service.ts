import { Injectable } from '@nestjs/common';
import { CreateFinancialTransactionDto } from './dto/create-financial_transaction.dto';
import { UpdateFinancialTransactionDto } from './dto/update-financial_transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinancialTransaction } from './entities/financial_transaction.entity';
import * as dayjs from 'dayjs';
import { calcRecurrenceDate } from './financial_transaction.utils';

@Injectable()
export class FinancialTransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFinancialTransactionDto: CreateFinancialTransactionDto) {
    let data = createFinancialTransactionDto;
    let due_date = data.due_date;

    const financial_transaction = await this.prisma.financial_transaction.create({
      data: data,
    });

    if (data.recurrencies > 1) {
      let i = 1;
      while (i <= data.recurrencies - 1) {
        data = data;
        due_date = calcRecurrenceDate(due_date, data.periodicity);
        await this.prisma.financial_transaction.create({
          data: { ...data, due_date: due_date },
        });

        i++;
      }
    }
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
    const { recurrencies, ...data } = updateFinancialTransactionDto;

    return this.prisma.financial_transaction.update({
      where: { id },
      data: data,
    });
  }

  markedPaid(id: number, updateFinancialTransactionDto: UpdateFinancialTransactionDto) {
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
