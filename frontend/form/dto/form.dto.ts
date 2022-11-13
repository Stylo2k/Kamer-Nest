interface Form {
    [key: string]: {
        name? : string,
        id? : string,
        type? : string,
        required? : boolean,
    };
    button : {
        name : string
    };
}

interface FormFields {
    [key: string]: {
        name? : string,
        id? : string,
        type? : string,
        required? : boolean,
    };
}


interface LooseObject {
    [key: string]: any;
}

export type {
    Form,
    FormFields,
    LooseObject
}