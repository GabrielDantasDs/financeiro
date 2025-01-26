import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { RequestDto } from './dto/request-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs'

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}
  async search(requestDto: RequestDto) {
    let response = null;
    
    if (requestDto.date_type == 'DUE_DATE') {
      response = await this.prisma.financial_transaction.findMany({
        where: {
          invoice_date: {
            lte:dayjs(requestDto.final_date).endOf('day').format(),
            gte:dayjs(requestDto.initial_date).startOf('day').format(),
          },
          ...(requestDto.type != 'SALDO' ? {type: requestDto.type} : {}),
          ...(requestDto.category != "" ? {category_id: +requestDto.category} : {}),
          ...(requestDto.bank_account != "" ? {bank_account_id: +requestDto.bank_account} : {}),
          client_id: +requestDto.client,
        },
        include: {
          client: true,
          category: true,
        },
      });
    } else if (requestDto.date_type == 'PAYDAY') {
      response = await this.prisma.financial_transaction.findMany({
        where: {
          payment_date: {
            lte: requestDto.final_date,
            gte: requestDto.initial_date,
          },
          ...(requestDto.type != 'SALDO' ? {type: requestDto.type} : {}),
          ...(requestDto.category != "" ? {category_id: +requestDto.category} : {}),
          ...(requestDto.bank_account != "" ? {bank_account_id: +requestDto.bank_account} : {}),
          client_id: +requestDto.client,
        },
        include: {
          client: true,
          category: true,
        },
      });
    } else {
      response = await this.prisma.financial_transaction.findMany({
        where: {
          OR: [
            {
              payment_date: {
                lte: requestDto.final_date,
                gte: requestDto.initial_date,
              },
            },
            {
              invoice_date: {
                lte: requestDto.final_date,
                gte: requestDto.initial_date,
              },
            },
          ],
          ...(requestDto.type != 'SALDO' ? {type: requestDto.type} : {}),
          ...(requestDto.category != "" ? {category_id: +requestDto.category} : {}),
          ...(requestDto.bank_account != "" ? {bank_account_id: +requestDto.bank_account} : {}),
          client_id: +requestDto.client,
        },
        include: {
          client: true,
          category: true,
        },
      });
    }
    return response;
  }
}
