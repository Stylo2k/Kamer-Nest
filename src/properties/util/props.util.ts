import { LocationDto } from "../location/dto";

async function getPropertyOwner(propertyId: number) {
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


interface LocationSearch extends LocationDto {
    userId: number;
}

async function findByLocation({ lng, lat, userId }: LocationSearch) {
    const ownedByUser = await this.prismaService.property.findMany({
        where: {
            longitude : lng,
            latitude : lat,
            ownerId : userId
        }
    });

    return ownedByUser;
}


export {
    getPropertyOwner,
    findByLocation
}