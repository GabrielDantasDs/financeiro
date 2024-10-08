import { Injectable } from '@nestjs/common';
import { CreateCostCenterDto } from './dto/create-cost_center.dto';
import { UpdateCostCenterDto } from './dto/update-cost_center.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CostCenterService {
  constructor(readonly prisma: PrismaService) {}
  create(createCostCenterDto: CreateCostCenterDto) {
    return this.prisma.cost_center.create({ data: createCostCenterDto });
  }

  findAll(client_id: string, page: string, query: string) {
    const _page = parseInt(page) ?? 0;
    const _query = query ?? "";
    const skip = _page * 10;
    const take = 10;

    return this.prisma.cost_center.findMany({ include: { 
      category: true
    },
    skip,
    take,
    where: {
      name: { 
        startsWith: _query
      },
      category: {
        client_id: parseInt(client_id)  
      }
    }});
  }

  simpleList(client_id: string) {
    return this.prisma.cost_center.findMany({ 
      where: {
        category: {
          client_id: { 
            equals: parseInt(client_id)
          }
        }
      }
    })
  }

  findOne(id: number) {
    return this.prisma.cost_center.findFirstOrThrow({ where: { id } });
  }

  update(id: number, updateCostCenterDto: UpdateCostCenterDto) {
    return this.prisma.cost_center.update({ where: { id: id }, data: updateCostCenterDto});
  }

  remove(id: number) {
    return this.prisma.cost_center.delete({ where: { id } });
  }
}
