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

interface queryProps {
    city: {};
    ownerId : number;
    active?: boolean;
    rent?: {
        lte?: number;
        gte?: number;
    };
}

interface configProps {
    orderBy?: {};
    take?: number;
}

async function findByCity(city: string, userId: number, query: CityQueryDto) {
    const active = query.active;
    const minPrice = query.minPrice;
    const maxPrice = query.maxPrice;
    const top = query.top;
    const order = query.order;
    const orderBy = query.orderBy;

    let props : queryProps = {
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

    let config : configProps = {}

    if (top !== undefined) {
        config.take = top;
    }

    if (orderBy !== undefined) {
        config.orderBy = {
            [orderBy]: order
        }
    }

    const ownedByUserAtCity = await this.prismaService.property.findMany({
        where: props,
        ...config
    });

    return ownedByUserAtCity;
}


export {
    getPropertyOwner,
    findByLocation,
    findByCity
}