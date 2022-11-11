import { CityQueryDto } from "../city/dto";
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

interface props {
    city: {};
    ownerId : number;
    active?: boolean;
    rent?: {
        lte?: number;
        gte?: number;
    };
}

async function findByCity(city: string, userId: number, query: CityQueryDto) {
    const active = query.active;
    const minPrice = query.minPrice;
    const maxPrice = query.maxPrice;
    const top = query.top;
    const order = query.order;

    let props : props = {
        city: {
            equals: city,
            mode: 'insensitive'
        },
        ownerId: userId
    }

    if (active !== undefined) {
        props.active = active;
    }
    
    props.rent = {
        gte: minPrice || 0,
        lte: maxPrice || 99999999999999,
    }

    const ownedByUserAtCity = await this.prismaService.property.findMany({
        where: props,
        orderBy: {
            rent: order || 'asc'
        },
        take: top || 99999999999999
    });

    return ownedByUserAtCity;
}


export {
    getPropertyOwner,
    findByLocation,
    findByCity
}