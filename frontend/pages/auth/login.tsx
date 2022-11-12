import { createForm, validateForm, getElemsFromForm } from '../../util';
import { LoginBody, AuthResponseData, ErrorResponseData } from './auth.dto';
import { serialize } from 'cookie'
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next";

axios.defaults.baseURL = 'http://localhost:3000/';


export default function Login() {
    async function loginUser({email, password} : LoginBody) {
        try {
            const response = await axios.post('auth/login', {
                email,
                password
            }, {
                withCredentials: true
            });
            const data : AuthResponseData = response.data;
            console.log(data);

        } catch (error : any) {
            alert(error);
            const errorResponseData : ErrorResponseData = error.response.data;
            console.log(errorResponseData);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const {email, password} = getElemsFromForm(form, ['email', 'password']);
        const body : LoginBody = {
            email,
            password
        };
        const valid = validateForm(body);
        if (valid) {
            loginUser(body);
        }
    }

    return (
        <div className="signin login form">
            <h1>Sign In</h1>
            {createForm(handleSubmit, {
                email: {
                    name: 'Email',
                    type: 'email'
                },
                password: {
                    name: 'Password',
                    type: 'password'
                },
                button: {
                    name: 'Sign In'
                }
            })}
        </div>
    )
}