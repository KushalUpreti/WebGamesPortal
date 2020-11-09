import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navlinks.css";
import { signInWithGoogle } from '../../shared/Functions/Firebase'

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
                    <button onClick={signInWithGoogle} to="/auth">AUTHENTICATE</button>
                </li>
            </ul>
        </>
    )
}

export default NavLinks;