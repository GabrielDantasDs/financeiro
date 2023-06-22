import { Prisma } from "@prisma/client";
import { Decimal, DecimalJsLike } from "@prisma/client/runtime";
import { FinancialTransaction } from "../entities/financial_transaction.entity";

export class CreateFinancialTransactionDto implements FinancialTransaction{
    fin_client: Prisma.clientCreateNestedOneWithoutFinancial_transactionInput;
    fin_type: string;
    fin_value: string | number | Decimal | DecimalJsLike;
    fin_category: Prisma.categoryCreateNestedOneWithoutFinancial_transactionInput;
    fin_invoice_date?: string | Date;
    fin_note?: string;
    fin_payment_day: string | Date;
    fin_payed: boolean;
    fin_periodicity_type: string;
    fin_periodicity: number;
    fin_cost_center: Prisma.cost_centerCreateNestedOneWithoutFinancial_transactionInput;
    subscriber?: Prisma.subscriberCreateNestedOneWithoutFinancial_transactionInput;
}

