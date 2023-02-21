import { Prisma } from "@prisma/client";

export class Movimentacao {
   tipo: string;
   valor: Prisma.Decimal;
   data: Date
   caixa: Prisma.CaixaCreateNestedOneWithoutMovimentacaoInput 
}
