import { Prisma } from "@prisma/client"

export class Caixa {
    inicial: Prisma.Decimal
    data_ultima_alteracao: Date
    status: boolean
    cliente: Prisma.ClienteCreateNestedOneWithoutCaixaInput
}
