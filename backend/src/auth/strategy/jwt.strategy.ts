import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { SafeUserDto } from '../../user/dto';
import { JwtPayload, ReqUser } from "../dto";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config : ConfigService, private readonly prismaService : PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload : JwtPayload) : Promise<ReqUser> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.sub
            }
        });

        if (!user) {
            throw new Error('User not found');
        } 
        const safeUser = new SafeUserDto(user);
        return {...safeUser, payload};
    }
}