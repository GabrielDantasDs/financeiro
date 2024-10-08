import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BankAccountService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBankAccountDto: CreateBankAccountDto) {
    return this.prisma.bank_account.create({ data: createBankAccountDto });
  }

  findAll(id: string) {
    return this.prisma.bank_account.findMany({
      where: {
        client_id: parseInt(id),
      },
    });
  }

  simpleList(client_id: string) {
    return this.prisma.bank_account.findMany({
      where: {
        client_id: parseInt(client_id)
      },
      select: {
        id: true,
        name: true
      }
    })
  }

  findOne(id: string) {
    return this.prisma.bank_account.findFirst({
      where: {
        id: parseInt(id)
      },
    });
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto, ) {
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
