import { Prisma } from "@prisma/client";
import { Category } from "../entities/category.entity";
import { PartialType } from "@nestjs/mapped-types";
import { IsNumberString, IsString } from "class-validator";

export class CreateCategoryDto extends Category {
    @IsString()
    name: string;

    @IsNumberString()
    client_id: number;

    @IsString()
    type: string;
}
