import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('TsiCakes API')
    .setDescription('TsiCakes API description')
    .setVersion('1.0')
    .build();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // important! converts query params to DTO types
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
