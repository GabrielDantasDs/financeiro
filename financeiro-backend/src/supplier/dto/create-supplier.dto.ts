import { IsNumberString, IsString } from "class-validator";
import { Supplier } from "../entities/supplier.entity";

export class CreateSupplierDto extends Supplier{
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsNumberString()
    client_id: number;
}
