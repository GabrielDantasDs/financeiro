import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService){}
  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: createCustomerDto });
  }

  findAll(client_id: string, page: string, query: string) {
    const _page = parseInt(page) ?? 0;
    const _query = query ?? "";
    const skip = _page * 10;
    const take = 10;

    return this.prisma.customer.findMany({ 
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
    return this.prisma.customer.findMany({ 
      where: {
        client_id: {
          equals: parseInt(client_id)
        }
      }
    })
  }

  findOne(id: number) {
    return this.prisma.customer.findFirst({where: {id:id}})
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({ where: {id:id}, data: updateCustomerDto})
  }

  remove(id: number) {
    return this.prisma.customer.delete({ where: { id:id }});
  }
}
