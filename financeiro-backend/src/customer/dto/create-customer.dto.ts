import { IsNumberString, IsOptional, IsString } from "class-validator";
import { Customer } from "../entities/customer.entity";

export class CreateCustomerDto extends Customer{
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

    @IsNumberString()
    client_id: number;
}
