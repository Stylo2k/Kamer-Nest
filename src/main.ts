import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // only allow properties that are defined in the DTO
    forbidNonWhitelisted: true, // if true, it will throw an error if the user sends a property that is not in the DTO
    transform: true, // transform the data to the type we want
    }));
  await app.listen(3000);
}
bootstrap();
