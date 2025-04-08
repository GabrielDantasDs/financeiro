import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const clientsCount = await this.prisma.client.count({
      where: {
        user_id: userId,
      },
    });

    return {
      user,
      dashboardData: {
        clientsCount
      },
    };
  }
}
