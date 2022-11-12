import axios from 'axios';
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
    async function getMine() {
        try {
            const response = await axios.get(MINE_ENDPOINT);
            const data : Property[] = response.data;
            console.log(data);
        } catch (error : any) {
            alert(error);
            const errorResponseData : ErrorResponseData = error.response.data;
            console.log(errorResponseData);
        }
    }

    return (
        <div>
            <button onClick={getMine}>Get Mine</button>
        </div>
    )
}