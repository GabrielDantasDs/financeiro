import { IsEmail, IsNumberString, IsOptional, isString, IsString } from "class-validator";
import { Customer } from "../entities/customer.entity";

export class RequestCustomerDto extends Customer{
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
    product_id: number;
}
