import { createFromPrepared, prepareForm, dealWithForm } from '../../form';
import { LoginBody, AuthResponseData, ErrorResponseData } from './auth.dto';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true;

const LOGIN_ENDPOINT = 'auth/login';

const FORM_FIELDS = {
    email: {
        type: 'email'
    },
    password: {
        type: 'password'
    }
}

const FORM_KEYS = Object.keys(FORM_FIELDS);
const PREPARED_FORM_FIELDS = prepareForm(FORM_FIELDS);

export default function Login() {
    async function loginUser(body : LoginBody) {
        try {
            const response = await axios.post(LOGIN_ENDPOINT, body);
            const data : AuthResponseData = response.data;
            console.log(data);
        } catch (error : any) {
            alert(error.response.data.message);
            const errorResponseData : ErrorResponseData = error.response.data;
            console.log(errorResponseData);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const [err, body] = dealWithForm(form, FORM_KEYS, PREPARED_FORM_FIELDS) as [any, LoginBody];
        if (err) {
            alert(body);
            return;
        }
        loginUser(body);
    }

    return (
        <div className="signin login form">
            <h1>Sign In</h1>
            {createFromPrepared(handleSubmit, {...PREPARED_FORM_FIELDS, button: {name: 'Sign In'}})}
        </div>
    )
}