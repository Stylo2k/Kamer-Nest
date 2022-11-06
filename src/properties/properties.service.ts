import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Property } from '@prisma/client';
import { ReqUser } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqPropertyDto, UpdatePropertyDto } from './dto';

@Injectable()
export class PropertiesService {
    constructor(private prismaService : PrismaService) {}

    async getAll(): Promise<Property[]> {
        return await this.prismaService.property.findMany();
    }

    async getMine(reqUser: ReqUser) {
        const ownerProperties = await this.prismaService.property.findMany({
            where: {
                ownerId: reqUser.user.id
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
        let newPropertyData = {...propertyData, ownerId : reqUser.user.id};

        const data =  await this.prismaService.property.create({
            data: newPropertyData,
        });

        return new ReqPropertyDto(data);
    }

    async remove(propertyId: number, reqUser : ReqUser) {
        const userId = reqUser.user.id;
        const propertyOwner = await this.getPropertyOwner(propertyId);

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
        const propertyOwner = await this.getPropertyOwner(+propertyId);
        const userId = reqUser.user.id;

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

    async getPropertyOwner(propertyId: number) {
        const propertyOwner = await this.prismaService.property.findUnique({
            where: {
                id: propertyId
            },
            include: {
                owner: true
            }
        });
        return propertyOwner && propertyOwner.owner;
    }

}
