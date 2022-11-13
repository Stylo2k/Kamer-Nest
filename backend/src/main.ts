import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // only allow properties that are defined in the DTO
    forbidNonWhitelisted: true, // if true, it will throw an error if the user sends a property that is not in the DTO
    transform: true, // transform the data to the type we want
    }));
    app.enableCors({
        credentials: true,
        origin: 'http://localhost:3030'
    });
    const sessionSecret = process.env.SESSION_SECRET || 'secret';
    app.use(
        session({
          secret: sessionSecret,
          resave: false,
          saveUninitialized: false,
        }),
      );
    app.use(passport.initialize());
    app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
