import { Injectable } from '@nestjs/common';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InstallmentsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createInstallmentDto: CreateInstallmentDto) {
    return this.prismaService.installments.create({
      data: createInstallmentDto,
    });
  }

  findAll() {
    return this.prismaService.installments.findMany();
  }

  findOne(id: number) {
    return this.prismaService.installments.findFirst({ where: { id } });
  }

  update(id: number, updateInstallmentDto: UpdateInstallmentDto) {
    return this.prismaService.installments.update({
      where: { id },
      data: updateInstallmentDto,
    });
  }

  remove(id: number) {
    return this.prismaService.installments.delete({ where: { id } });
  }
}
