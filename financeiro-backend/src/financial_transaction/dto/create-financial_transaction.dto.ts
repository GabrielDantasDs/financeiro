import { FinancialTransaction } from "../entities/financial_transaction.entity";
import { Decimal } from "@prisma/client/runtime";
import { IsDateString, IsDecimal, IsNumber, isObject, IsObject, IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";

export class CreateFinancialTransactionDto implements FinancialTransaction{
    @IsObject()
    fin_customer: Prisma.ClienteCreateNestedOneWithoutFinancialTransactionsInput;

    @IsString()
    fin_type: string;

    @IsObject()
    fin_category: Prisma.CategoriesCreateNestedOneWithoutFinancialTransactionsInput;

    @IsDecimal()
    fin_value: Decimal;

    @IsString()
    @IsOptional()
    fin_note: string;

    @IsDateString()
    fin_date: Date;
}
