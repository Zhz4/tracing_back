import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from '@/common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 配置请求体大小限制，支持大型埋点数据
  app.use(bodyParser.json({ limit: '50mb' })); // JSON 请求体限制为 50MB
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // URL 编码请求体限制为 50MB
  app.use(bodyParser.text({ type: 'text/plain', limit: '50mb' })); // 文本请求体限制为 50MB
  // 启用全局验证管道，用于自动转换和验证请求数据
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 自动转换数据类型
      whitelist: true, // 过滤掉未定义的属性
      forbidNonWhitelisted: true, // 如果存在未定义的属性，则抛出异常
    }),
  );
  // 启用全局JWT保护 - 所有路由默认需要认证
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  // 启用全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // 启用 CORS 以支持跨域请求
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
  });

  // 启用 Swagger
  const config = new DocumentBuilder()
    .setTitle('前端埋点 API')
    .setDescription('前端埋点 API 文档')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: '输入JWT token',
        in: 'header',
      },
      'auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
