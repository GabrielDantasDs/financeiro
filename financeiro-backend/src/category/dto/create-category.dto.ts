import { Prisma } from "@prisma/client";
import { Category } from "../entities/category.entity";

export class CreateCategoryDto implements Category {
    cat_name: string;
    cat_cost_center?: Prisma.cost_centerCreateNestedOneWithoutCategoryInput;
    financial_transaction?: Prisma.financial_transactionCreateNestedManyWithoutFin_categoryInput;
}
