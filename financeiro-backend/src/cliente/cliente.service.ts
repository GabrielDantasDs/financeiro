import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService){}
  create(data: CreateClienteDto) {
    return this.prisma.cliente.create({data})
  }

  findAll() {
    return this.prisma.cliente.findMany();
  }

  findOne(id: number) {
    return this.prisma.cliente.findFirst({where:{id}});
  }

  update(id: number, data: UpdateClienteDto) {
    return this.prisma.cliente.update({
      where: {
        id
      },
      data
    })
  }

  remove(id: number) {
    return this.prisma.cliente.delete({ 
      where: {
        id
      }
    })
  }
}
