import { FormEventHandler } from "react";

interface Form {
    [key: string]: {
        name : string,
        id? : string,
        type? : string,
        required? : boolean,
    };
    button : {
        name : string
    };
}

function camelize(str : string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

function createForm(onSubmit : FormEventHandler<HTMLFormElement>, form : Form) : JSX.Element {
    return (
        <form onSubmit={onSubmit}>
            {Object.entries(form).map(([key, value]) => {
                if (key === 'button') {
                    return;
                }
                const id = value.id || camelize(value.name.toLowerCase());
                const type = value.type || 'text';
                const required = value.required || true;
                const name = value.name;
                
                const label = <label htmlFor={id}>{value.name}</label>;
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
    createForm
}