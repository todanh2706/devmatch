import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create an instance of the NestJS app, asign to AppModule
  await app.listen(process.env.PORT ?? 3000); // AppModule listen on PORT
}
bootstrap();
