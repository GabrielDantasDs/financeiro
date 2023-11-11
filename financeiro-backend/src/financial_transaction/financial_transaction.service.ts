import { Injectable } from '@nestjs/common';
import { CreateFinancialTransactionDto } from './dto/create-financial_transaction.dto';
import { UpdateFinancialTransactionDto } from './dto/update-financial_transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinancialTransaction } from './entities/financial_transaction.entity';
import * as dayjs from 'dayjs'
import { CreateInstallmentDto } from 'src/installments/dto/create-installment.dto';

@Injectable()
export class FinancialTransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createFinancialTransactionDto: CreateFinancialTransactionDto) {
    const financial_transaction = await this.prisma.financial_transaction.create({
      data: createFinancialTransactionDto,
    })

    const createInstallments = () => {
      let installments = [];
  
      for (let i = 0; i < financial_transaction.fin_number_installments; i++) {
        let installment = new CreateInstallmentDto();
  
        installment.ins_number = i;
  
        if (financial_transaction.fin_periodicity_type == 'RECORRENTE') {
          installment.ins_payday =
            i == 0
              ? dayjs(financial_transaction.fin_payment_day).format()
              : dayjs(financial_transaction.fin_payment_day)
                  .add(financial_transaction.fin_periodicity, 'days')
                  .format();
        } else {
          installment.ins_payday = dayjs(financial_transaction.fin_payment_day).format();
        }
  
        installment.ins_value = +financial_transaction.fin_value / financial_transaction.fin_number_installments;
  
        installments.push(installment);
      }
  
      return installments;
    }

    // const transaction = this.prisma.$transaction([
    //   this.prisma.installments.createMany({
    //     data: createInstallments()
    //   })
    // ])
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
