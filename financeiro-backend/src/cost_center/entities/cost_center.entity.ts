import { Prisma } from "@prisma/client";

export class CostCenter implements Prisma.cost_centerUncheckedCreateInput{
    category_id: number;
    id?: number;
    name: string;
}
