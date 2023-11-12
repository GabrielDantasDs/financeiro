import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { UnauthorizedExceptionFilter } from './filters/exceptions/http/http-unauthorized.filter';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:8000', 'http://localhost:3000', 'https://financeiro-lac.vercel.app', "http://172.18.0.2:3000"],
    credentials: true
  })

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

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
