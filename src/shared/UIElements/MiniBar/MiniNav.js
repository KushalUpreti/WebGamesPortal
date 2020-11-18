import React from 'react';
import './MiniNav.css';

const MiniNav = (props) => {
    return (
        <ul className="MiniNav">
            <li>
                <button onClick={props.favorites}>Favorites</button>
            </li>
            <li>
                <button onClick={props.history}>Played Games</button>
            </li>
            <li>
                <button>Link 2</button>
            </li>
        </ul>
    )
}
export default MiniNav;