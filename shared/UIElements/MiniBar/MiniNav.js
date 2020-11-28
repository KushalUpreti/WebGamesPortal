import React from 'react';
import './MiniNav.css';

const MiniNav = (props) => {
    return (
        <ul className="MiniNav">
            <li>
                <button onClick={props.favorites}>Favorites</button>
            </li>
            <li>
                <button onClick={props.history}>History </button>
            </li>
        </ul>
    )
}
export default MiniNav;