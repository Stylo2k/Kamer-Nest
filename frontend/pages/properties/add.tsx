import {dealWithForm, createFromPrepared, prepareForm} from '../../form';
import { PropertyRequest } from './property.dto';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true;
const PROPERTIES_ENDPOINT = 'properties';

const FORM_FIELDS = {
    title: {},
    description: {},
    type: {},
    areaSq: {name: 'Area (sq)', type: 'number'},
    rent: { type: 'number'},
    deposit: { type: 'number'},
    furnished: { type: 'checkbox'},
    pets: { type: 'checkbox'},
    city: {},
    coverImageUrl : {},
    latitude : {type: 'number'},
    longitude : {type: 'number'},
    postalCode : {},
    gender : {},
    active : {type: 'checkbox'}
}

const PREPARED_FORM_FIELDS = prepareForm({...FORM_FIELDS, button: {name : 'Add Property'}})
const FORM_KEYS = Object.keys(FORM_FIELDS);

export default function Add() {
    async function addProperty(body : PropertyRequest) {
        try {
            const { data } = await axios.post(PROPERTIES_ENDPOINT, body);
            alert('Property added successfully');
        } catch (error : any) {
            alert(error.response.data.message);
        }
    }

    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const [err, body] = dealWithForm(form, FORM_KEYS, PREPARED_FORM_FIELDS);
        
        if (err) {
            alert(body);
        } else {
            addProperty(body as PropertyRequest);
        }
    }

    return (
        <div className="form add-property">
            <h1>Add A Property</h1>
         {createFromPrepared(handleSubmit, {...PREPARED_FORM_FIELDS, button: {name: 'Add Property'}})}
        </div>
    )
}