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
        clientsCount,
      },
    };
  }

  async getDashboardClientData(clientId: number) {
    const receitaSum = await this.prisma.financial_transaction.aggregate({
      _sum: {
        value: true,
      },
      where: {
        client_id: clientId,
        type: 'RECEITA',
      },
    });

    const despesaSum = await this.prisma.financial_transaction.aggregate({
      _sum: {
        value: true,
      },
      where: {
        client_id: clientId,
        type: 'DESPESA',
      },
    });

    const data = {
      receitaSum: receitaSum._sum.value || 0,
      despesaSum: despesaSum._sum.value || 0,
    };

    return data;
  }
}
