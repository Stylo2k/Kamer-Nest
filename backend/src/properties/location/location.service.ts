import { Injectable, NotFoundException } from '@nestjs/common';
import { ReqUser } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePropertyDto } from '../dto';
import { LocationDto } from './dto';
import { findByLocation } from '../util/props.util';


@Injectable()
export class LocationService {
    constructor(private readonly prismaService : PrismaService) {}
    
    async getAtCoordinates({lng, lat} : LocationDto, reqUser : ReqUser) {
        const userId = reqUser.id;
        const ownedByUser = await findByLocation.call(this, {lng, lat, userId});
        return ownedByUser;
    }

    async patchLocation({lng, lat} : LocationDto, propertyData : UpdatePropertyDto, reqUser : ReqUser) {
        const userId = reqUser.id;
        const ownedByUser = await findByLocation.call(this, {lng, lat, userId});
        
        if (ownedByUser.length === 0) {
            throw new NotFoundException(`No property found at coordinates (${lat}, ${lng})`);
        }

        const updated = await this.prismaService.property.updateMany({
            where: {
                longitude : lng,
                latitude : lat,
                ownerId : userId
            },
            data: propertyData
        });

        return {updated: updated.count};
    }

    async deleteAtCoordinates({lng, lat} : LocationDto, reqUser : ReqUser) {
        const userId = reqUser.id;
        const ownedByUser = await findByLocation.call(this, {lng, lat, userId});
        
        if (ownedByUser.length === 0) {
            throw new NotFoundException(`No property found at coordinates (${lat}, ${lng})`);
        }

        const deleted = await this.prismaService.property.deleteMany({
            where: {
                longitude : lng,
                latitude : lat,
                ownerId : userId
            }
        });

        return {
            deleted : deleted.count
        };
    }
}
