import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Navlinks from './NavLinks';
import Sidedrawer from '../UIElements/SideDrawer/Sidedrawer';

const Header = (props) => {
    const [state, setState] = useState({
        openDrawer: false
    })

    const showDrawerHandler = () => {
        setState({
            openDrawer: true
        })
    }
    const hideDrawerHandler = () => {
        setState({
            openDrawer: false
        })
    }

    return <header className="MainHeader">
        <div className="HamIcon" onClick={showDrawerHandler}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <h1 className="main-navigation__title">
            <Link to="/WebGamesPortal">Web Games Portal</Link>
        </h1>
        <Sidedrawer show={state.openDrawer} close={hideDrawerHandler} />
        <Navlinks />
    </header>
}

export default Header;