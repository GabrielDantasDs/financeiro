import { Module, Post } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserModule } from './user/user.module';
import { RolesGuard } from './authorization/guards/roles.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClientModule } from './client/client.module';
import { FinancialTransactionModule } from './financial_transaction/financial_transaction.module';
import { BankAccountModule } from './bank_account/bank_account.module';
import { CategoryModule } from './category/category.module';
import { SubscriberModule } from './subscriber/subscriber.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, DashboardModule, ClientModule, FinancialTransactionModule, BankAccountModule, CategoryModule, SubscriberModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule {}
