import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Property } from '@prisma/client';
import { ReqUser } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqPropertyDto, UpdatePropertyDto } from './dto';
import { getPropertyOwner } from './util/props.util';

@Injectable()
export class PropertiesService {
    constructor(private prismaService : PrismaService) {}

    async getAll(): Promise<Property[]> {
        return await this.prismaService.property.findMany();
    }

    async getMine(reqUser: ReqUser) {
        const ownerProperties = await this.prismaService.property.findMany({
            where: {
                ownerId: reqUser.id
            }
        });
        return ownerProperties;
    }

    async getOne(propertyId: number) {
        const property = await this.prismaService.property.findUnique({
            where: {
                id: propertyId
            }
        });

        if (!property) {
            throw new NotFoundException(`Property with id ${propertyId} not found`);
        }
        
        return property;
    }

    async create(reqUser : ReqUser, propertyData: ReqPropertyDto) {
        let newPropertyData = {...propertyData, ownerId : reqUser.id};

        const data =  await this.prismaService.property.create({
            data: newPropertyData,
        });

        return new ReqPropertyDto(data);
    }

    async remove(propertyId: number, reqUser : ReqUser) {
        const userId = reqUser.id;
        const propertyOwner = await getPropertyOwner.call(this, propertyId);

        // spoof the response if the property does not exist
        if (!propertyOwner || propertyOwner.id !== userId) {
            throw new UnauthorizedException(`You are not the owner of this property`);
        }
        
        return await this.prismaService.property.delete({
            where: {
                id: propertyId
            }
        });
    }

    async patch(propertyId: number, propertyData: UpdatePropertyDto, reqUser : ReqUser) {
        const propertyOwner = await getPropertyOwner.call(this, +propertyId);
        const userId = reqUser.id;

        if (!propertyOwner || propertyOwner.id !== userId) {
            throw new UnauthorizedException(`You are not the owner of this property`);
        }

        return await this.prismaService.property.update({
            where: {
                id: propertyId
            },
            data: propertyData
        });
    }



}
