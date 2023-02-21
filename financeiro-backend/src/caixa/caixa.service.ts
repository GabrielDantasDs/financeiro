import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCaixaDto } from './dto/create-caixa.dto';
import { UpdateCaixaDto } from './dto/update-caixa.dto';

@Injectable()
export class CaixaService {
  constructor(private readonly prisma: PrismaService){}
  create(data: CreateCaixaDto) {
    return this.prisma.caixa.create({data})
  }

  findAll() {
    return this.prisma.caixa.findMany()
  }

  findOne(id: number) {
    return this.prisma.caixa.findFirst({
      where: {
        id
      }
    })
  }

  update(id: number, data: UpdateCaixaDto) {
    return this.prisma.caixa.update({
      where: {
        id
      },
      data
    })
  }

  remove(id: number) {
    return this.prisma.caixa.delete({
      where: {
        id
      }
    })
  }
}
