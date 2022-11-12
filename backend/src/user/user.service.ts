import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService : PrismaService) {}

    async findOne(email : string) : Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        });
        return user;
    }
}
