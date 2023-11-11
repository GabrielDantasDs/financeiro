import { Periodicity_type, Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime';
import { CreateInstallmentDto } from 'src/installments/dto/create-installment.dto';
import dayjs from 'dayjs';
import { Installment } from 'src/installments/entities/installment.entity';

export class FinancialTransaction
  implements Prisma.financial_transactionCreateInput
{
  fin_type: string;
  fin_value: string | number | Prisma.Decimal | DecimalJsLike;
  fin_invoice_date?: string | Date;
  fin_note?: string;
  fin_payment_day: string | Date;
  fin_payed: boolean;
  fin_periodicity_type?: Periodicity_type;
  fin_periodicity?: number;
  fin_number_installments?: number;
  fin_client: Prisma.clientCreateNestedOneWithoutFinancial_transactionInput;
  fin_category: Prisma.categoryCreateNestedOneWithoutFinancial_transactionInput;
  fin_bank_account: Prisma.bank_accountCreateNestedOneWithoutFinancial_transactionInput;
  fin_cost_center: Prisma.cost_centerCreateNestedOneWithoutFinancial_transactionInput;
  subscriber?: Prisma.subscriberCreateNestedOneWithoutFinancial_transactionInput;
  installments?: Prisma.installmentsCreateNestedManyWithoutIns_financial_transacationInput;
}
