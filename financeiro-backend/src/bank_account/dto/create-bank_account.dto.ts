import { Prisma } from '@prisma/client';
import { BankAccount } from '../entities/bank_account.entity';

import { IsBoolean, IsDateString, IsNumber, IsNumberString, IsString} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { DecimalJsLike } from '@prisma/client/runtime/library';

export class CreateBankAccountDto extends BankAccount {
    @IsNumberString()
    client_id:number;

    @IsString()
    institution: string;

    @IsDateString()
    date_inicial_value: string | Date;

    @IsString()
    description: string;
    
    @IsString()
    inicial_value: string | number | Prisma.Decimal | DecimalJsLike;

    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsBoolean()
    default: boolean;
}
