import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
  imports: [MulterModule.register({
  })]
})
export class PostModule {}
