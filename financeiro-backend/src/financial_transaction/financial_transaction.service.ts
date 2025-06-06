import { Injectable } from '@nestjs/common';
import { CreateFinancialTransactionDto } from './dto/create-financial_transaction.dto';
import { UpdateFinancialTransactionDto } from './dto/update-financial_transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinancialTransaction } from './entities/financial_transaction.entity';
import { calcRecurrenceDate } from './financial_transaction.utils';

@Injectable()
export class FinancialTransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFinancialTransactionDto: CreateFinancialTransactionDto) {
    let data = createFinancialTransactionDto;
    let due_date = data.due_date;

    if (!data.bank_account_id) {
      const bank_account = await this.prisma.bank_account.findFirst({
        where: {
          client_id: data.client_id,
        }
      });

      if (!bank_account) {
        throw new Error('Conta bancária não encontrada');
      }

      data = { ...data, bank_account_id: bank_account.id };
    }

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

    if (data.number_installments) {
      let i = 1;

      while (i <= data.number_installments - 1) {
        await this.prisma.installments.create({ data: { financial_transaction_id: financial_transaction.id, due_date: financial_transaction.due_date, value: financial_transaction.value } });
      }
    }
  }

  async findAll(client_id: number, search:string) {
    return await this.prisma.financial_transaction.findMany({
      where: {
        note: {
          startsWith: search 
        },
        client_id: client_id, 
      }
    });
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

  async getCalendar(id: number) {
    return await this.prisma.financial_transaction.findMany();
  }
}
