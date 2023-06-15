import { Prisma } from "@prisma/client";
import { Client } from "../entities/client.entity";

export class CreateClientDto implements Client{
    cli_name: string;
    cli_document: string;
    cli_phone: string;
    cli_address: string;
    cli_district: string;
    cli_number: string;
    cli_state: string;
    cli_city: string;
    cli_zip_code: string;
    cli_email: string;
    created_at: string | Date;
    financial_transaction?: Prisma.financial_transactionCreateNestedManyWithoutFin_clientInput;
    subscriber?: Prisma.subscriberCreateNestedManyWithoutSub_clientInput;
}
