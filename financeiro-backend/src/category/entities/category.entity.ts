import { Prisma } from "@prisma/client";

export class Category implements Prisma.categoryUncheckedCreateInput{
    name: string;
    client_id: number;
    type: string;
    financial_transaction?: Prisma.financial_transactionUncheckedCreateNestedManyWithoutCategoryInput;
}
