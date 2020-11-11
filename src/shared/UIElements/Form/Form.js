import React from 'react';


const Form = (props) => {
    return (
        <form onSubmit={props.submit}>
            {props.children}
        </form>
    );
}

export default Form;