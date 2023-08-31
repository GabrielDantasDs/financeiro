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

  findAll() {
    return this.prisma.cost_center.findMany({ include: { 
      category: true
    }});
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
