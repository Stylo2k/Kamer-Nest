import { camelize, deCamelize } from "../../string";
import { Form, FormFields, LooseObject } from "../dto/form.dto";


/**
 * Gets the values from the form, if not set then defaulted to ''
 * Also maps the every element in elem as key to value
 * @param form the form to get the values from
 * @param elems the elements to get the values of
 * @returns an object; key is the name of the element, value is the value of the element or '' if not set
 */
function getElemsFromForm(form : HTMLFormElement, elems : string[]) {
    const formData : FormData = new FormData(form);
    let ret : LooseObject = {};

    for (let elem of elems) {
        console.log("elem : ", elem);
        console.log("value : ", formData.get(elem));
        ret[elem] = formData.get(elem) || '';
    }
    return ret;
}

/**
 * Converts the checkbox value to a boolean. This is set to true if the value is 'on'
 * 
 * @param value the value of the checkbox
 * @returns true if the value is 'on', false otherwise
 */
function toBoolean(value : 'on' | 'off') {
    if (value === 'on') {
        return true;
    }
    return false;
}

/**
 * Prepares a form. This means adding the following values to each entry;
 * - name: the name of the field, if not provided, it will be the deCamelized version of the key
 * - id: the id of the field, if not provided, it will be the camelized version of the name then lowercased
 * - type: the type of the field, if not provided, it will be 'text'
 * - required: whether the field is required, if not provided, it will be true
 * 
 * Make sure to always provide a button entry with a name property, this will ignored.
 * @param form the form fields to prepare
 * @returns the prepared form
 */
 function prepareForm(form : FormFields) {
    let ret : FormFields = {...form};

    for (let [key, value] of Object.entries(form)) {
        if (key === 'button') {
            continue;
        }

        const name = value.name || deCamelize(key);
        const id = value.id || camelize(name.toLowerCase());
        const type = value.type || 'text';
        const required = value.required || true;

        ret[key] = {
            name,
            id,
            type,
            required
        }
    }
    return ret;
}

/**
 * Normalizes the form data into something to use in the backend. So converting frontend related values to 
 * actual values / concrete types / values. So 'on' to true, 'off' to false, etc. And a number to a number
 * 
 * @param fields the fields to normalize
 * @param formFields the constraints the form should adhere to; in here is the type of the field. @see prepareForm
 */
function normalizeForm(fields : LooseObject, formFields : LooseObject) {
    for (let [key, value] of Object.entries(fields)) {
        if (formFields[key].type === 'checkbox') {
            fields[key] = toBoolean(value);
        }
        if (formFields[key].type === 'number') {
            fields[key] = Number(value);
        }
    }
}

/**
 * Validates the form. This means checking if all required fields are set. If not, it will return an object
 * with the key being the name of the field and the value being the error message.
 * Never call this function before @see normalizeForm
 * @param fields  the fields to validate
 * @returns the errors, if any, or an empty object if no errors; !always check if the Object.keys(this).length === 0
 */
function validateForm(fields : LooseObject) {
    let ret : LooseObject = {};
    for (let [key, value] of Object.entries(fields)) {
        if (value === '') {
            ret[key] = 'This field is required';
        }
    }
    console.log("Validated : ", ret);
    return ret;
}

/**
 * Puts the errors from @see validateFrom into a string and returns it
 * 
 * @param ret the errors from @see validateFrom
 * @returns the errors as a string; message : related field
 */
function reqFields(ret : LooseObject) {
    let message = '';
    for (const [key, value] of Object.entries(ret)) {
        message += `${value} : ${key}\n`;
    }
    return message;
}


function dealWithForm<Type>(form : HTMLFormElement, FORM_KEYS : string[], preparedFormFields : FormFields) {
    const body = getElemsFromForm(form, FORM_KEYS);
    normalizeForm(body as LooseObject, preparedFormFields);

    const ret = validateForm(body);
    const isValid = Object.keys(ret).length === 0;
    if (isValid) {
        return [false, body as Type];
    }
    return [true, reqFields(ret)];
}



export {
    getElemsFromForm,
    validateForm,
    normalizeForm,
    reqFields,
    prepareForm,
    dealWithForm,
    type Form,
}