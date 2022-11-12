import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { Login, SignUp } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(private prismaService : PrismaService, private jwtService : JwtService, private config : ConfigService) {}

    async signup(dto : SignUp) {
        
        let hashedPassword = await argon.hash(dto.password);
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                }
            });

            return {
                message: "User created successfully",
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName : user.lastName,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin,
                token: await this.signToken(user.id, user.email)
            };

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already exists');
                }
            }
        }
    }

    async login(dto : Login) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }
        const pwMatches = argon.verify(user.password, dto.password);
        
        if (!pwMatches) {
            throw new ForbiddenException('Invalid credentials');
        }
        const oldLogin = user.lastLogin;
        
        // update last login asynchronously
        this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                lastLogin: new Date()
            }
        });

        return {
            message: "User logged in successfully",
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName : user.lastName,
            createdAt: user.createdAt,
            lastLogin: oldLogin,
            token: await this.signToken(user.id, user.email)
        };
    }

    async signToken(id : number, email : string) {
        const payload = {
            sub : id,
            email
        }
        return this.jwtService.signAsync(payload, {
            'expiresIn' : '15m',
            secret: this.config.get('JWT_SECRET')
        });
    }
}
