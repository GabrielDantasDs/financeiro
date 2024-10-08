import { Prisma } from "@prisma/client";
import { Client } from "../entities/client.entity";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateClientDto extends Client{
    @IsString()
    name: string;

    @IsString()
    document: string;

    @IsString()
    phone: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    district: string;

    @IsString()
    @IsOptional()
    number: string;

    @IsString()
    @IsOptional()
    state: string;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    zip_code: string;

    @IsEmail()
    email: string;
}
