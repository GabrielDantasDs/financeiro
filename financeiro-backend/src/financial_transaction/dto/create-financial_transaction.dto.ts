import { FinancialTransaction } from "../entities/financial_transaction.entity";
import { Decimal } from "@prisma/client/runtime";
import { IsDecimal, IsNumber, isObject, IsObject, IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";

export class CreateFinancialTransactionDto implements FinancialTransaction{
    @IsObject()
    fin_customer: Prisma.ClienteCreateNestedOneWithoutFinancialTransactionsInput;

    @IsString()
    fin_type: string;

    @IsString()
    fin_category: string;

    @IsDecimal()
    fin_value: Decimal;

    @IsString()
    @IsOptional()
    fin_note: string;
}
