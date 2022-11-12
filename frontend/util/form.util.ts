interface LooseObject {
    [key: string]: any;
}

function getElemsFromForm(form : HTMLFormElement, elems : string[]) {
    const formData : FormData = new FormData(form);
    console.log(form)
    let ret : LooseObject = {};

    for (let elem of elems) {
        ret[elem] = formData.get(elem) || '';
    }
    return ret;
}

function validateForm(fields : LooseObject) {
    let ret : LooseObject = {};
    for (let [key, value] of Object.entries(fields)) {
        if (value === '') {
            ret[key] = 'This field is required';
        }
    }
    return ret;
}

function reqFields(ret : LooseObject) {
    let message = '';
    for (const [key, value] of Object.entries(ret)) {
        message += `${value} : ${key}\n`;
    }
    return message;
}



export {
    getElemsFromForm,
    validateForm,
    reqFields
}