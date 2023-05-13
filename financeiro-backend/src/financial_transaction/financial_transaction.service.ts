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
    let total_entradas = await this.prisma.financialTransactions
      .aggregate({
        where: {
          fin_type: 'Entrada',
          fin_customer_id: customer_id,
        },
        _sum: {
          fin_value: true,
        },
      })
      .then((res) => res);

    let total_saidas = await this.prisma.financialTransactions
      .aggregate({
        where: {
          fin_type: 'Saida',
          fin_customer_id: customer_id,
        },
        _sum: {
          fin_value: true,
        },
      })
      .then((res) => res);

    const [entradas_data, saidas_data] = await Promise.all([
      this.prisma.financialTransactions
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
          return res;
        }),
      this.prisma.financialTransactions
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
          return res;
        }),
    ]);

    const categorias_entradas_promises = entradas_data.map((obj,i) => {
      return this.prisma.categories
      .findFirst({
        where: {
          id: obj.fin_category_id,
        },
      })
      .then((res) => {return {id: res.id, nome: res.cat_name}})
    });

    const categorias_saidas_promises = saidas_data.map((obj,i) => {
      return this.prisma.categories
      .findFirst({
        where: {
          id: obj.fin_category_id,
        },
      })
      .then((res) => {return {id: res.id, nome: res.cat_name}})
    });

    const resolves_promises_categorias_entradas = await Promise.all(categorias_entradas_promises);
    const resolves_promises_categorias_saidas = await Promise.all(categorias_saidas_promises);

    const entradas = entradas_data.map((obj, i) => {
      return {
        categoria: resolves_promises_categorias_entradas.find(x => x.id == obj.fin_category_id).nome,
        porcentagem:
          (Number(obj._sum.fin_value) / Number(total_entradas._sum.fin_value)) *
          100,
      };
    });

    const saidas = saidas_data.map((obj, i) => {
      return {
        categoria: resolves_promises_categorias_saidas.find(x => x.id == obj.fin_category_id).nome,
        porcentagem:
          (Number(obj._sum.fin_value) / Number(total_saidas._sum.fin_value)) *
          100,
      };
    });

    return [entradas, saidas];
  }
}
