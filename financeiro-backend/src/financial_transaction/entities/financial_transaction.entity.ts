import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime/library';
import dayjs from 'dayjs';

export class FinancialTransaction
  implements Prisma.financial_transactionUncheckedCreateInput
{
  bank_account_id: number;
  category_id: number;
  cost_center_id?: number;
  client_id: number;
  customer_id?: number;
  type: string;
  value: string | number | Prisma.Decimal | DecimalJsLike;
  first_transaction_id?: number;
  id?: number;
  invoice_date?: string | Date;
  due_date: string | Date;
  note?: string;
  payed: boolean;
  payment_date: string | Date;
  periodicity?: number;
  supplier_id?: number;
  number_installments?: number;
}
