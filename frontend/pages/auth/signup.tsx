import axios from 'axios';
import { getElemsFromForm, validateForm, reqFields, createForm} from '../../util';
import { SignUpBody, ErrorResponseData, AuthResponseData } from './auth.dto';


const SIGN_UP_ENDPOINT = 'auth/signup';
axios.defaults.baseURL = 'http://localhost:3000/';

export default function SignUp() {
    async function registerUser({email, password, firstName, lastName} : SignUpBody) {
        try {
            const response = await axios.post(SIGN_UP_ENDPOINT, {
                email,
                password,
                firstName,
                lastName
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
        e.preventDefault()
        const form = e.currentTarget;
        const {email, password, passwordConfirmation, firstName, lastName} = getElemsFromForm(form, ['email', 'password', 'passwordConfirmation', 'firstName', 'lastName']);
    
        const body : SignUpBody = {
            email,
            password,
            passwordConfirmation,
            firstName,
            lastName
        }

        const ret = validateForm(body);
        const isValid = Object.keys(ret).length === 0;
        
        if (isValid) {
            registerUser(body);
        } else {
            const message = reqFields(ret);
            alert(message);
        }
    }

    return (
        <div className="signup form">
            <h1>Sign Up</h1>
            {createForm(handleSubmit, {
                email: {
                    name: 'Email',
                    type: 'email'
                },
                password: {
                    name: 'Password',
                    type: 'password'
                },
                passwordConfirmation: {
                    name: 'Confirm Password',
                    id: 'passwordConfirmation',
                    type: 'password'
                },
                firstName: {
                    name: 'First Name'
                },
                lastName: {
                    name: 'Last Name'
                },
                button: {
                    name: 'Sign Up'
                }
            })}
        </div>
    )
}