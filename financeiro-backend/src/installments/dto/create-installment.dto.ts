import { Prisma } from '@prisma/client';
import { Decimal, DecimalJsLike } from '@prisma/client/runtime';
import { Installment } from '../entities/installment.entity';

export class CreateInstallmentDto implements Installment {
  ins_value: string | number | Decimal | DecimalJsLike;
  ins_number: number;
  ins_payday: string | Date;
  ins_id_financial_transacation: number;
  ins_financial_transacation?: Prisma.financial_transactionCreateNestedOneWithoutInstallmentsInput;
}
