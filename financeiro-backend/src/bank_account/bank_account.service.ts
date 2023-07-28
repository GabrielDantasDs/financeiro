import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BankAccountService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBankAccountDto: CreateBankAccountDto) {
    return this.prisma.bank_account.create({ data: createBankAccountDto });
  }

  findAll(id: number) {
    return this.prisma.bank_account.findMany({
      where: {
        bac_id_client: id,
      },
    });
  }

  findOne(id: number, data: Object) {
    return this.prisma.bank_account.findFirst({
      where: {
        id: id,
        bac_id_client: data['id']
      },
    });
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return this.prisma.bank_account.update({
      where: {
        id: id,
      },
      data: updateBankAccountDto,
    });
  }

  remove(id: number) {
    return this.prisma.bank_account.delete({
      where: { id: id },
    });
  }
}
