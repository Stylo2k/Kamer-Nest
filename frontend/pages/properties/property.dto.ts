interface PropertyRequest {
    areaSq: number
    city: string
    coverImageUrl: string
    furnished: boolean
    latitude: number
    longitude: number
    postalCode: string
    type: string
    rent: number
    title: string
    deposit: number
    gender: string
    active: boolean
    description: string
    pets: boolean
}
interface Property extends PropertyRequest {
    id: number;
    createdAt: Date
    updatedAt: Date
    ownerId: number
}


export type {
    Property,
    PropertyRequest
}