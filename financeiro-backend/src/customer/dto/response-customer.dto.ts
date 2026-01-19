import { IsEmail, IsNumberString, IsOptional, IsString } from "class-validator";

export class ResponseCustomerDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    document?: string;

    @IsString()
    @IsOptional()
    neighborhood: string;

    @IsString()
    @IsOptional()
    state?: string;

    @IsString()
    @IsOptional()
    number?: string;

    @IsString()
    phone: string;

    @IsEmail()
    email: string

    @IsString()
    @IsOptional()
    zip_code?: string;

    @IsNumberString()
    client_id: number;

    @IsNumberString()
    @IsOptional()
    product_id?: number;
}