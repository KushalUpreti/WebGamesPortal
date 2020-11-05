import React from 'react';
import './Form.css'

const Form = (props) => {
    return (
        <form className="From" onSubmit={props.submit}>
            {props.children}
        </form>
    );
}

export default Form;