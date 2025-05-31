import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from '@/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 添加对 text/plain 的支持
  app.use(bodyParser.text({ type: 'text/plain' }));
  // 启用全局验证管道，用于自动转换和验证请求数据
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 自动转换数据类型
    }),
  );
  // 启用全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // 启用 CORS 以支持跨域请求
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
