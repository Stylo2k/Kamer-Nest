import {createForm, validateForm, getElemsFromForm} from '../../util';
import { PropertyRequest } from './property.dto';

export default function Add() {
    function addProperty(body : PropertyRequest) {

    }
    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        console.log('YO')
    }

    return (
        <div className="form add-property">
         {createForm(handleSubmit, {
            title: {
                name: 'Title',
                type: 'text'
            },
            description: {
                name: 'Description',
                type: 'text'
            },
            type: {
                name: 'Type',
                type: 'text'
            },
            areaSq: {
                name: 'Area (sq)',
                type: 'number'
            },
            rent: {
                name: 'Rent',
                type: 'number'
            },
            deposit: {
                name: 'Deposit',
                type: 'number'
            },
            furnished: {
                name: 'Furnished',
                type: 'checkbox'
            },
            pets: {
                name: 'Pets',
                type: 'checkbox'
            },
            button: {
                name: 'Add Property'
            }
         })}
        </div>
    )
}