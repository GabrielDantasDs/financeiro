import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";


export class FinancialTransaction implements Prisma.FinancialTransactionsCreateInput{
    fin_type: string;
    fin_category: Prisma.CategoriesCreateNestedOneWithoutFinancialTransactionsInput;
    fin_value: Decimal;
    fin_note: string;
    fin_customer: Prisma.ClienteCreateNestedOneWithoutFinancialTransactionsInput;
    fin_date: Date;
}
