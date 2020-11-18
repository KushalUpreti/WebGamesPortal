import React from 'react';
import './Dropdown.css'

const Dropdown = (props) => {
    return (
        <select onChange={props.change} value={props.valueProp} className="Dropdown">
            {props.children}
        </select>
    );
}

export default Dropdown;