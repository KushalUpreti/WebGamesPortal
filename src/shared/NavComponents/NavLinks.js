import React, { useContext, } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navlinks.css";
import { signInWithGoogle } from '../Functions/Firebase';
import AuthContext from '../Contexts/AuthContext';
import Avatar from '../UIElements/Avatar/Avatar';
import { useHistory } from 'react-router-dom';


const NavLinks = (props) => {
    const history = useHistory();

    const auth = useContext(AuthContext);
    let imgUrl = "";
    let userName = "";
    if (auth.loggedIn) {
        let userDetails = JSON.parse(localStorage.getItem("userCred"));
        userName = userDetails.displayName;
        const index = userName.indexOf(" ");
        if (index !== -1 && index < 8) {
            userName = userName.slice(0, index);
        } else {
            userName = userName.slice(0, 8);
            userName = userName + "...";
        }
        imgUrl = userDetails.photoURL;
    }

    return (
        <>
            <ul className="NavLinks">
                {
                    auth.loggedIn ? <li>
                        <NavLink style={{
                            background: "none",
                            border: "none",
                            color: "white",
                        }} to="/user">
                            <Avatar imageUrl={imgUrl} name={userName} />
                        </NavLink>
                    </li> : null
                }

                <li>
                    <NavLink to="/WebGamesPortal/about" >ABOUT US</NavLink>
                </li>
                <li>
                    <NavLink to="/WebGamesPortal/contact">CONTACT US</NavLink>
                </li>
                {
                    auth.loggedIn ?
                        <button onClick={() => {
                            auth.signOut();
                            history.push("/WebGamesPortal");
                        }}>LOG OUT
                            </button> :
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

export default NavLinks;