import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma:PrismaService){}
  find(id:number) {
    return this.prisma.client.findFirst({
      where: {
        id
      }
    });
  }

}
