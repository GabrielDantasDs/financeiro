import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll(client_id: string, page: string, query: string) {
    const _page = parseInt(page) ?? 0;
    const _query = query ?? "";
    const skip = _page * 10;
    const take = 10;

    return this.prisma.product.findMany({ 
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
    return this.prisma.product.findMany({ 
      where: {
        client_id: {
          equals: parseInt(client_id)
        }
      }
    })
  }

  findOne(id: number) {
    return this.prisma.product.findFirst({ where: { id:id }})
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({ where: {id:id}, data: updateProductDto });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: {id:id }});
  }
}
