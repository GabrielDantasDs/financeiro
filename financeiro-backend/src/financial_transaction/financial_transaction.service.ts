import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFinancialTransactionDto } from './dto/create-financial_transaction.dto';
import { UpdateFinancialTransactionDto } from './dto/update-financial_transaction.dto';

@Injectable()
export class FinancialTransactionService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateFinancialTransactionDto) {
    return this.prisma.financialTransactions.create({ data });
  }

  findAllByCustomer(id: number) {
    return this.prisma.financialTransactions.findMany({
      where: {
        fin_customer_id: id,
      },
      include: {
        fin_category: true,
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
    return this.prisma.financialTransactions.delete({
      where: {
        id,
      },
    });
  }

  async getChartsData(customer_id: number) {
    let entradas = [];
    let saidas = [];

    let total_entradas = this.prisma.financialTransactions
      .aggregate({
        where: {
          fin_type: 'Entrada',
          fin_customer_id: customer_id
        },
        _sum: {
          fin_value: true,
        },
      })
      .then((res) => res);

    let total_saidas = this.prisma.financialTransactions
      .aggregate({
        where: {
          fin_type: 'Saida',
          fin_customer_id: customer_id
        },
        _sum: {
          fin_value: true,
        },
      })
      .then((res) => res);

    await this.prisma.financialTransactions
      .groupBy({
        by: ['fin_category_id'],
        where: {
          fin_customer_id: customer_id,
          fin_type: 'Entrada',
        },
        _sum: {
          fin_value: true,
        },
      })
      .then((res) => {
        res.map(async (cat, i) => {
          entradas.push({
            categoria: await this.prisma.categories
              .findFirst({
                where: {
                  id: cat.fin_category_id,
                },
              })
              .then((res) => res.cat_name),
              porcentagem: (Number(cat._sum.fin_value) /Number((await total_entradas)._sum.fin_value)) * 100
          });
        });
      });

    await this.prisma.financialTransactions
      .groupBy({
        by: ['fin_category_id'],
        where: {
          fin_customer_id: customer_id,
          fin_type: 'Saida',
        },
        _sum: {
          fin_value: true,
        },
      })
      .then((res) => {
        res.map(async (cat, i) => {
          saidas.push({
            categoria: await this.prisma.categories
              .findFirst({
                where: {
                  id: cat.fin_category_id,
                },
              })
              .then((res) => res.cat_name),
            porcentagem: (Number(cat._sum.fin_value)/ Number((await total_saidas)._sum.fin_value)) * 100
          });
        });
      });

    return [entradas, saidas];
  }
}
