import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  findAll(client_id: string, page: string, query: string) {
    const _page = parseInt(page) ?? 0;
    const _query = query ?? "";
    const skip = _page * 10;
    const take = 10;

    return this.prisma.category.findMany({ 
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

  findOne(id: number) {
    return this.prisma.category.findFirst({ where: { id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }

  simpleList(client_id: string) {
    return this.prisma.category.findMany({
      where: {
        client_id: {
          equals: parseInt(client_id)
        }
      }
    });
  }
}
