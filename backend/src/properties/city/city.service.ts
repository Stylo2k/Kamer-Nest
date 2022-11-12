import { Injectable, NotFoundException } from '@nestjs/common';
import { ReqUser } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { findByCity } from '../util/props.util';
import { CityQueryDto } from './dto';

@Injectable()
export class CityService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAtCity(city: string, reqUser: ReqUser, query : CityQueryDto) {
        const userId = reqUser.id;
        const found = await findByCity.call(this, city, userId, query);

        if (found.length === 0) {
            let message = `No properties found at ${city}`;
            if (query.active !== undefined) {
                message += ` with active status : ${query.active}`;
            }
            if (query.minPrice !== undefined) {
                message += ` with budget less than : ${query.minPrice}`;
            }
            if (query.maxPrice !== undefined) {
                message += ` with budget greater than : ${query.maxPrice}`;
            }
            throw new NotFoundException(message);
        }

        return found;
    }
}
