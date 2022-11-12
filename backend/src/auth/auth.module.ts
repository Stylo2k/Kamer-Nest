import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, LocalStrategy } from './strategy';
import { SessionSerializer } from './utils/session.serializer';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';


@Module({
    imports: [UserModule, PassportModule.register({ session: true })],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
    exports: []
})
export class AuthModule {}
