import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialTransactionDto } from './create-financial_transaction.dto';

export class UpdateFinancialTransactionDto extends PartialType(CreateFinancialTransactionDto) {}
