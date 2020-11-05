import React from 'react';
import './Dropdown.css'

const Dropdown = (props) => {
    return (
        <select onChange={props.change} className="Dropdown">
            {props.children}

        </select>
    );
}

export default Dropdown;