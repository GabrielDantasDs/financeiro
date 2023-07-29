import { Prisma } from "@prisma/client";
import { Category } from "../entities/category.entity";

export class CreateCategoryDto implements Category {
    cat_name: string;
    financial_transaction?: Prisma.financial_transactionCreateNestedManyWithoutFin_categoryInput;
}
