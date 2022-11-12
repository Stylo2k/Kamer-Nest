import { Module } from '@nestjs/common';
import { PropertiesModule } from './properties/properties.module';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), PropertiesModule, PrismaModule, AuthModule, UserModule],
  controllers: [AppController]
})
export class AppModule {}
