import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create an instance of the NestJS app, asign to AppModule
  app.useGlobalPipes(new ValidationPipe()); // The general ValidationPipe
  await app.listen(process.env.PORT ?? 3000); // AppModule listen on PORT
}
bootstrap();
