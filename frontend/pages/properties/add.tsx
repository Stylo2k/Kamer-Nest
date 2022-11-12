import {createForm, validateForm, getElemsFromForm} from '../../util';

export default function Add() {
    function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // const form = e.currentTarget;
        // const {title, description, address, price, bedrooms, bathrooms, sqft, image} = getElemsFromForm(form, ['title', 'description', 'address', 'price', 'bedrooms', 'bathrooms', 'sqft', 'image']);
        // const body = {
        //     title,
        //     description,
        //     address,
        //     price,
        //     bedrooms,
        //     bathrooms,
        //     sqft,
        //     image
        // };
        // const valid = validateForm(body);
        // if (valid) {
        //     console.log(body);
        // }
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