import { Prisma } from "@prisma/client";

export class Client implements Prisma.clientUncheckedCreateInput {
    user_id: number;
    category?: Prisma.categoryUncheckedCreateNestedManyWithoutClientInput;
    product?: Prisma.productUncheckedCreateNestedManyWithoutClientInput;
    address: string;
    bank_account?: Prisma.bank_accountUncheckedCreateNestedManyWithoutClientInput;
    city: string;
    created_at?: string | Date;
    customer?: Prisma.customerUncheckedCreateNestedManyWithoutClientInput;
    document: string;
    email: string;
    financial_transaction?: Prisma.financial_transactionUncheckedCreateNestedManyWithoutClientInput;
    id?: number;
    name: string;
    neighborhood: string;
    number: string;
    phone: string;
    state: string;
    supplier?: Prisma.supplierUncheckedCreateNestedManyWithoutClientInput;
    zip_code: string;
}