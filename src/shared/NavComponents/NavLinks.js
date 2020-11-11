import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navlinks.css";
import { signInWithGoogle } from '../../shared/Functions/Firebase';
import AuthContext from '../Contexts/AuthContext';
import Avatar from '../UIElements/Avatar/Avatar';
import png from '../../assets/download.png'

const NavLinks = (props) => {
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
                    <NavLink to="/about" >ABOUT US</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">CONTACT US</NavLink>
                </li>
                {
                    auth.loggedIn ? <div class="w3-dropdown-hover">
                        <button style={{ borderRadius: "50%" }} class="w3-button"><img style={{ width: "20px", height: "20px" }} src={png}></img></button>
                        <div className="w3-dropdown-content w3-bar-block w3-border">
                            <a href="logout.co" style={{ color: "white", backgroundColor: "#292929" }} className="w3-bar-item w3-button">Link 1</a>

                        </div>
                    </div> : <li>
                            <button onClick={() => {
                                signInWithGoogle(auth.signIn);
                            }} >AUTHENTICATE</button>
                        </li>
                }

            </ul>
        </>
    )


}

export default NavLinks;