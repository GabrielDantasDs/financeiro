import { IsNumberString, IsOptional, IsString } from "class-validator";
import { Supplier } from "../entities/supplier.entity";

export class CreateSupplierDto extends Supplier{
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
