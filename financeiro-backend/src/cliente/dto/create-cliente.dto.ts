import { Prisma } from "@prisma/client";
import { IsEmail, IsObject, IsString } from "class-validator";
import { Cliente } from "../entities/cliente.entity";

export class CreateClienteDto implements Cliente {
    @IsString()
    cus_name: string;

    @IsString()
    cus_documento: string;

    @IsString()
    cus_phone: string;

    @IsEmail()
    cus_email: string;

    @IsString()
    cus_address: string;

    @IsString()
    cus_district: string;

    @IsString()
    cus_city: string;

    @IsString()
    cus_number: string;

    @IsString()
    cus_state: string;

    @IsString()
    cus_zip_code: string;

    @IsObject()
    caixa?: Prisma.CaixaCreateWithoutClienteInput;
}
