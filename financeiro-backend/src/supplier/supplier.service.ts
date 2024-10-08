import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSupplierDto: CreateSupplierDto) {
    return this.prisma.supplier.create({ data: createSupplierDto });
  }

  findAll(client_id: string, page: string, query: string) {
    const _page = parseInt(page) ?? 0;
    const _query = query ?? "";
    const skip = _page * 10;
    const take = 10;

    return this.prisma.supplier.findMany({ 
      skip,
      take,
      where: {
        client_id: {
          equals: parseInt(client_id)
        },
        name: { 
          startsWith: _query
        }
      }
    });
  }

  simpleList(client_id: string) {
    return this.prisma.supplier.findMany({ 
      where: {
        client_id: {
          equals: parseInt(client_id)
        }
      }
    })
  }

  findOne(id: number) {
    return this.prisma.supplier.findFirst({where: {id:id}})
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    console.log(id)
    return this.prisma.supplier.update({ where: {id:id}, data: updateSupplierDto})
  }

  remove(id: number) {
    return this.prisma.supplier.delete({ where: { id: id }})
  }
}
