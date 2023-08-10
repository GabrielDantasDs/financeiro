import { Prisma } from "@prisma/client";
import { CostCenter } from "../entities/cost_center.entity";

export class CreateCostCenterDto implements CostCenter{
    coc_name: string;
    category?: Prisma.categoryCreateNestedManyWithoutCat_cost_centerInput;
    financial_transaction?: Prisma.financial_transactionCreateNestedManyWithoutFin_cost_centerInput;
}
