import { Prisma } from "@prisma/client";
import { BankAccount } from "../entities/bank_account.entity";
import { DecimalJsLike } from "@prisma/client/runtime";

export class CreateBankAccountDto implements BankAccount {
    bac_institution: string;
    bac_inicial_value: string | number | Prisma.Decimal | DecimalJsLike;
    bac_date_inicial_value: string | Date;
    bac_name: string;
    bac_type: string;
    bac_description: string;
    bac_client: Prisma.clientCreateNestedOneWithoutBank_accountInput;
    payment_condition?: Prisma.payment_conditionCreateNestedManyWithoutPac_bank_accountInput;
    
}
