import { Prisma } from "@prisma/client";
import { CostCenter } from "../entities/cost_center.entity";
import { IsNumberString, IsString } from "class-validator";

export class CreateCostCenterDto extends CostCenter{
    @IsString()
    name: string;
    
    @IsNumberString()
    category_id: number;
}
