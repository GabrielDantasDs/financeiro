import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreateCategoriaDto) {
    return this.prisma.categories.create({ data });
  }

  findAll() {
    return this.prisma.categories.findMany();
  }

  findOne(id: number) {
    return this.prisma.categories.findFirst({ where: { id } })
  }

  update(id: number, data: UpdateCategoriaDto) {
    return this.prisma.categories.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.categories.delete({
      where: {
        id,
      },
    });
  }
}
