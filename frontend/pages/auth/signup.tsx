import axios from 'axios';
import { createFromPrepared, prepareForm, dealWithForm} from '../../form';
import { SignUpBody, ErrorResponseData, AuthResponseData } from './auth.dto';


const SIGN_UP_ENDPOINT = 'auth/signup';
axios.defaults.baseURL = 'http://localhost:3000/';

const FORM_FIELDS = {
    email: {
        type: 'email'
    },
    password: {
        type: 'password'
    },
    passwordConfirmation: {
        type: 'password'
    },
    firstName: {},
    lastName: {},
    button: {
        name: 'Sign Up'
    }
}

const FORM_KEYS = Object.keys(FORM_FIELDS);
const PREPARED_FORM_FIELDS = prepareForm(FORM_FIELDS);

export default function SignUp() {
    async function registerUser(body : SignUpBody) {
        try {
            const response = await axios.post(SIGN_UP_ENDPOINT, body);
            const data : AuthResponseData = response.data;
        } catch (error : any) {
            alert(error.response.data.message);
            const errorResponseData : ErrorResponseData = error.response.data;
            console.log(errorResponseData);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget;
        const [err, body] = dealWithForm(form, FORM_KEYS, PREPARED_FORM_FIELDS) as [any, SignUpBody];
        if (err) {
            alert(body);
            return;
        }
        registerUser(body);
    }

    return (
        <div className="signup form">
            <h1>Sign Up</h1>
            {createFromPrepared(handleSubmit, {...PREPARED_FORM_FIELDS, button: {name: 'Sign Up'}})}
        </div>
    )
}