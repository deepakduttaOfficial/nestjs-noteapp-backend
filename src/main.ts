import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Add validation for entire application
  app.useGlobalPipes(new ValidationPipe());

  // Cors
  app.enableCors({ origin: '*' });

  // App listening
  await app.listen(3000, () => console.log('App running'));
}
bootstrap();
