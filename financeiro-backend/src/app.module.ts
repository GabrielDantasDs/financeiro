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
import { CostCenterModule } from './cost_center/cost_center.module';
import { ReportModule } from './report/report.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { SupplierModule } from './supplier/supplier.module';
import { ProductModule } from './product/product.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { RagModule } from './rag/rag.module';
import EventsGateway from './events.gateway';
import { ChatService } from './rag/chat.service';


@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, UserModule, DashboardModule, ClientModule, FinancialTransactionModule, BankAccountModule, CategoryModule, CostCenterModule, ReportModule, CustomerModule, SupplierModule, ProductModule, SubscriptionModule, RagModule, RagModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    EventsGateway,
    ChatService
  ],
})
export class AppModule {};

