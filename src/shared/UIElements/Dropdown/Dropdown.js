import React from 'react';
import './Dropdown.css'

const Dropdown = (props) => {
    return (
        <select onChange={props.change} value={props.valueProp} className="Dropdown">
            <option selected disabled>Genre</option>
            {props.children}
        </select>
    );
}

export default Dropdown;