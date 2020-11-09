import React from 'react';
import './Input.css';
import SearchContext from '../../Contexts/SearchContext';

const Input = (props) => {
    return (
        <SearchContext.Consumer>
            {context => {
                return <input className="Input" id={props.id} type={props.type} placeholder={props.placeholder} onChange={context.searchItem} value={context.value || props.value} />
            }}
        </SearchContext.Consumer>
    );
}

export default Input;