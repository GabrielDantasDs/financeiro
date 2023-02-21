import { Module, Post } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserModule } from './user/user.module';
import { RolesGuard } from './authorization/guards/roles.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClienteModule } from './cliente/cliente.module';
import { CaixaModule } from './caixa/caixa.module';
import { MovimentacaoModule } from './movimentacao/movimentacao.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, PostModule, DashboardModule, ClienteModule, CaixaModule, MovimentacaoModule],
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
