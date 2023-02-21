import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { UnauthorizedExceptionFilter } from './filters/exceptions/http/http-unauthorized.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: ['http://localhost:8000', 'http://localhost:3000'],
    credentials: true
  })

  await app.listen(8000);
  // Pipes
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  //Filter
  //app.useGlobalFilters(new UnauthorizedExceptionFilter());

}
bootstrap();
