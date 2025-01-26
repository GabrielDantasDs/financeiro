import { Injectable } from "@nestjs/common";
import { CreateFinancialTransactionDto } from "./dto/create-financial_transaction.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RecurringFinancialTransactionService {
    constructor(private readonly prisma: PrismaService) {

    }
  async create(createFinancialTransactionDto: CreateFinancialTransactionDto) {
    await this.prisma.recurring_financial_transaction.create({
        data: {
            financial_transaction_id: createFinancialTransactionDto.id,
            original_date: createFinancialTransactionDto.due_date,
            recurrence_in_days: createFinancialTransactionDto.periodicity
        }
    });
  }
}