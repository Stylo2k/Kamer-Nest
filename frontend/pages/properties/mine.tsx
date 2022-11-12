import axios from 'axios';
import { useEffect, useState } from 'react';
import { ErrorResponseData } from '../auth/auth.dto';

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true;

const MINE_ENDPOINT = 'properties/mine';


interface Property {
    id: number
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
    createdAt: Date
    updatedAt: Date
    pets: boolean
    ownerId: number
}

export default function Mine() {
    const [properties, setProperties] = useState<Property[]>([]);
    
    async function getMine() {
        try {
            const response = await axios.get(MINE_ENDPOINT);
            const data : Property[] = response.data;
            setProperties(data);
        } catch (error : any) {
            alert(error);
            const errorResponseData : ErrorResponseData = error.response.data;
            console.log(errorResponseData);
        }
    }

    useEffect(() => {
        getMine();
    })

    return (
        <div>
            <div>
                <h1>My Properties</h1>
                {properties.map(property => (
                    <div key={property.id}>
                    <h4>{property.id}</h4>
                    <span>{JSON.stringify(property)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}