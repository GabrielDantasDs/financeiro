import { Periodicity_type, Prisma } from '@prisma/client';
import { Decimal, DecimalJsLike } from '@prisma/client/runtime';
import { FinancialTransaction } from '../entities/financial_transaction.entity';

export class CreateFinancialTransactionDto extends FinancialTransaction {
  fin_client: Prisma.clientCreateNestedOneWithoutFinancial_transactionInput;
  fin_type: string;
  fin_value: string | number | Decimal | DecimalJsLike;
  fin_category: Prisma.categoryCreateNestedOneWithoutFinancial_transactionInput;
  fin_invoice_date?: string | Date;
  fin_note?: string;
  fin_payment_day: string | Date;
  fin_number_installments?: number | null;
  fin_payed: boolean;
  fin_periodicity_type?: Periodicity_type;
  fin_periodicity: number | null;
  fin_cost_center: Prisma.cost_centerCreateNestedOneWithoutFinancial_transactionInput;
  fin_bank_account: Prisma.bank_accountCreateNestedOneWithoutFinancial_transactionInput;
  subscriber?: Prisma.subscriberCreateNestedOneWithoutFinancial_transactionInput;
}
