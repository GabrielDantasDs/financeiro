import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';

@Injectable()
export class MovimentacaoService {
  constructor(private readonly prisma:PrismaService){}
  create(data: CreateMovimentacaoDto) {
    return this.prisma.movimentacao.create({data})
  }

  findAll() {
    return this.prisma.movimentacao.findMany()
  }

  findOne(id: number) {
    return this.prisma.movimentacao.findFirst({
      where: {
        id
      }
    })
  }

  update(id: number, data: UpdateMovimentacaoDto) {
    return this.prisma.movimentacao.update({
      where: {
        id
      },
      data
    })
  }

  remove(id: number) {
    return this.prisma.movimentacao.delete({ 
      where: { 
        id
      }
    })
  }
}
