import { FormEventHandler } from "react";
import { camelize, deCamelize } from "../../string";
import { Form } from "../dto/form.dto";

/**
 * Creates the actual JSX element for a form. This function assumes the form fields have been prepared.
 * @see prepareForm
 * 
 * @param onSubmit the function to call when the form is submitted
 * @param form the prepared form
 * @returns the JSX element for the form
 */
function createFromPrepared(onSubmit : FormEventHandler<HTMLFormElement>, form : Form) {
    return (
        <form onSubmit={onSubmit}>
            {Object.entries(form).map(([key, value]) => {
                if (key === 'button') {
                    return;   
                }
                return (
                    <div key={key}>
                        <label htmlFor={value.id}>{value.name}</label>
                        <input name={value.id} type={value.type} id={value.id} required={value.required} />
                    </div>
                );
            })}
            <button type="submit">{form.button.name}</button>
        </form>
    )
}

/**
 * Creates a form from a form object. This function will prepare the form and then create the JSX element.
 * 
 * @param onSubmit the function to call when the form is submitted
 * @param form the form to create
 * @returns the JSX element for the form
 */
function createForm(onSubmit : FormEventHandler<HTMLFormElement>, form : Form) : JSX.Element {
    return (
        <form onSubmit={onSubmit}>
            {Object.entries(form).map(([key, value]) => {
                if (key === 'button') {
                    return;
                }
                const name = value.name || deCamelize(key);
                const id = value.id || camelize(name.toLowerCase());
                const type = value.type || 'text';
                const required = value.required || true;
                
                const label = <label htmlFor={id}>{name}</label>;
                const input = <input name={id} type={type} id={id} required={required}/>;
                return (
                    <div key={key}>
                        {label}
                        {input}
                    </div>
                );
            })}
            <button type="submit">{form.button.name}</button>
        </form>
    )
}

export {
    createForm,
    createFromPrepared
}