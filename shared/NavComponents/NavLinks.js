import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navlinks.css"

const NavLinks = (props) => {
    return (
        <>
            <ul className="NavLinks">
                <li>
                    <NavLink to="/about" >ABOUT US</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">CONTACT US</NavLink>
                </li>
                <li>
                    <NavLink to="/login">AUTHENTICATE</NavLink>
                </li>
            </ul>
        </>
    )
}

export default NavLinks;