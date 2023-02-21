
import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { IsDateString, IsDecimal, IsObject, IsString } from "class-validator";
import { Movimentacao } from "../entities/movimentacao.entity";

export class CreateMovimentacaoDto implements Movimentacao{

    @IsString()
    tipo: string;

    @IsDecimal()
    valor: Decimal;

    @IsDateString()
    data: Date;

    @IsObject()
    caixa: Prisma.CaixaCreateNestedOneWithoutMovimentacaoInput;
}
