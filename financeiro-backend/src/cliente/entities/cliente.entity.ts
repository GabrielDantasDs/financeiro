import { Prisma } from "@prisma/client";

export class Cliente implements Prisma.ClienteCreateInput {
    cus_name: string;
    cus_documento: string;
    cus_phone: string;
    cus_email: string;
    cus_address: string;
    cus_district: string;
    cus_number: string;
    cus_state: string;
    cus_zip_code: string
    cus_city: string;
    caixa?: Prisma.CaixaCreateWithoutClienteInput
}
