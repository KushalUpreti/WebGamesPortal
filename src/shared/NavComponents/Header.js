import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navlinks from './NavLinks';

const Header = (props) => {
    // <b style="color:#d32f2f; margin-left:-10px;">Beta</b>
    return <header className="MainHeader">
        <h1 className="main-navigation__title">
            <Link to="/WebGamesPortal">Web Games Portal</Link>
        </h1>

        <Navlinks />
    </header>
}

export default Header;