import React, { useContext } from 'react';
import { signInWithGoogle } from '../../../Functions/Firebase';
import AuthContext from '../../../Contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './SideNavElem.css'

const SideNavElem = (props) => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    return (
        <>
            <ul className="SideNavElem">

                <li>
                    <NavLink to="/WebGamesPortal/about" onClick={props.shut} >ABOUT US</NavLink>
                </li>
                <li>
                    <NavLink to="/WebGamesPortal/contact" onClick={props.shut}>CONTACT US</NavLink>
                </li>
                <li>
                    <NavLink to="/WebGamesPortal/privacy" onClick={props.shut}>PRIVACY</NavLink>
                </li>
                {
                    auth.loggedIn ?
                        <li>
                            <button onClick={() => {
                                auth.signOut();
                                history.push("/WebGamesPortal");
                            }}>LOG OUT
                            </button></li> :
                        <li>
                            <button onClick={() => {
                                signInWithGoogle(auth.signIn, history);
                            }} >LOG IN</button>
                        </li>
                }
            </ul>
        </>
    )
}

export default SideNavElem;