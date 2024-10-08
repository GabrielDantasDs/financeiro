import { Prisma } from "@prisma/client";

export class Supplier implements Prisma.supplierUncheckedCreateInput {
    address?: string;
    city?: string;
    client_id: number;
    created_at?: string | Date;
    document?: string;
    financial_transaction?: Prisma.financial_transactionUncheckedCreateNestedManyWithoutSupplierInput;
    id?: number;
    name: string;
    neighborhood?: string;
    number?: string;
    phone: string;
    recurring_supplier_order?: Prisma.recurring_supplier_orderUncheckedCreateNestedManyWithoutSupplierInput;
    state?: string;
    zip_code?: string;
}
