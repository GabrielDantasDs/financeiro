import { Prisma } from '@prisma/client';
import { Decimal, DecimalJsLike } from '@prisma/client/runtime/library';
import { FinancialTransaction } from '../entities/financial_transaction.entity';
import {
  IsDate,
  IsDateString,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFinancialTransactionDto extends FinancialTransaction {
  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  type: string;

  @IsDateString()
  payment_date: string | Date;

  @IsNumber()
  periodicity?: number;

  @IsDateString()
  invoice_date?: string | Date;

  @IsDecimal()
  value: string | number | Prisma.Decimal | DecimalJsLike;

  @IsOptional()
  @IsNumber()
  recurrencies: number | null;

  @IsOptional()
  cost_center_id?: number;

  @IsOptional()
  category_id: number;

  @IsOptional()
  recurrency: boolean;

  @IsOptional()
  @IsNumber()
  number_installments?: number;
}
