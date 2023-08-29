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

    if (requestDto.dateType == "DUE_DATE") {
      response = await this.prisma.financial_transaction.findMany({ 
        where: {
          fin_invoice_date: {
            lte: requestDto.finalDate.format(),
            gte: requestDto.initialDate.format(),
          },
          fin_type: requestDto.type,
          fin_id_client: requestDto.client
        }
      })
    }

    if (requestDto.dateType == "PAYDAY") {
      response = await this.prisma.financial_transaction.findMany({ 
        where: {
          fin_payment_day: {
            lte: requestDto.finalDate.format(),
            gte: requestDto.initialDate.format(),
          },
          fin_type: requestDto.type,
          fin_id_client: requestDto.client
        }
      })
    }

    return response;
  }
}
