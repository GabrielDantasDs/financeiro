import { Prisma } from "@prisma/client";
import { IsDateString, IsNumber, IsObject, IsString } from "class-validator";
import { Caixa } from "../entities/caixa.entity";

export class CreateCaixaDto implements Caixa {

    @IsNumber()
    inicial: Prisma.Decimal;

    @IsDateString()
    data_ultima_alteracao: Date;

    @IsString()
    status: boolean;

    @IsObject()
    cliente: Prisma.ClienteCreateNestedOneWithoutCaixaInput;
}
