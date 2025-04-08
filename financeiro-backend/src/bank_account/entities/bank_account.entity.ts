import { Prisma } from "@prisma/client";
import { PartialType } from '@nestjs/mapped-types';
import { DecimalJsLike } from "@prisma/client/runtime/library";

export class BankAccount implements Prisma.bank_accountUncheckedCreateInput {
    client_id: number;
    date_inicial_value: string | Date;
    description: string;
    financial_transaction?: Prisma.financial_transactionUncheckedCreateNestedManyWithoutBank_accountInput;
    id?: number;
    inicial_value: string | number | Prisma.Decimal | DecimalJsLike;
    institution: string;
    name: string;
    payment_method?: Prisma.payment_methodUncheckedCreateNestedManyWithoutBank_accountInput;
    type: string;
    default?: boolean;
}

