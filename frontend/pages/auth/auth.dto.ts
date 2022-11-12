interface LoginBody {
    email: FormDataEntryValue;
    password: FormDataEntryValue;
}

interface SignUpBody {
    email: FormDataEntryValue;
    password: FormDataEntryValue;
    firstName: FormDataEntryValue;
    lastName: FormDataEntryValue;
    passwordConfirmation? : FormDataEntryValue;
}

interface ErrorResponseData {
    statusCode : number;
    message : string;
    error? : string;
}

interface AuthResponseData {
    message: string,
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    createdAt: string,
    lastLogin: string,
    token: string
}

export type {
    LoginBody,
    SignUpBody,
    ErrorResponseData,
    AuthResponseData
}