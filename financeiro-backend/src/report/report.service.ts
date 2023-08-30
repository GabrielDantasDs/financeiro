import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { RequestDto } from './dto/request-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}
  async search(requestDto: RequestDto) {
    let response = null;

    if (requestDto.date_type == 'DUE_DATE') {
      response = await this.prisma.financial_transaction.findMany({
        where: {
          fin_invoice_date: {
            lte: requestDto.final_date,
            gte: requestDto.initial_date,
          },
          ...(requestDto.type != 'SALDO' ? {fin_type: requestDto.type} : {}),
          ...(requestDto.category != "" ? {fin_id_category: +requestDto.category} : {}),
          fin_id_client: +requestDto.client,
        },
        include: {
          fin_client: true,
          fin_category: true,
        },
      });
    } else if (requestDto.date_type == 'PAYDAY') {
      response = await this.prisma.financial_transaction.findMany({
        where: {
          fin_payment_day: {
            lte: requestDto.final_date,
            gte: requestDto.initial_date,
          },
          ...(requestDto.type != 'SALDO' ? {fin_type: requestDto.type} : {}),
          ...(requestDto.category != "" ? {fin_id_category: +requestDto.category} : {}),
          fin_id_client: +requestDto.client,
        },
        include: {
          fin_client: true,
          fin_category: true,
        },
      });
    } else {
      response = await this.prisma.financial_transaction.findMany({
        where: {
          OR: [
            {
              fin_payment_day: {
                lte: requestDto.final_date,
                gte: requestDto.initial_date,
              },
            },
            {
              fin_invoice_date: {
                lte: requestDto.final_date,
                gte: requestDto.initial_date,
              },
            },
          ],
          ...(requestDto.type != 'SALDO' ? {fin_type: requestDto.type} : {}),
          ...(requestDto.category != "" ? {fin_id_category: +requestDto.category} : {}),
          fin_id_client: +requestDto.client,
        },
        include: {
          fin_client: true,
          fin_category: true,
        },
      });
    }

    return response;
  }
}
