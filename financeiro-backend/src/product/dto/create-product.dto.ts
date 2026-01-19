import { IsDecimal, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { Product } from "../entities/product.entity";
import { Decimal, DecimalJsLike } from "@prisma/client/runtime/library";

export class CreateProductDto extends Product{
    @IsString()
    name: string;

    @IsDecimal()
    value: string | number | Decimal | DecimalJsLike;

    @IsNumberString()
    client_id: number;


    @IsNumber()
    @IsOptional()
    recurrency?: number;
}
