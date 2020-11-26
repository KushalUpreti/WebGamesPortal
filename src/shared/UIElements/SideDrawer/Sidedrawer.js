import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop/Backdrop';
import Container from '../../Containers/Container';
import SideNavElem from './SideNavElems/SideNavElem';
import AuthContext from '../../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import { get_avatar_url, get_background_url } from '../../Functions/Firebase';
import './Sidedrawer.css';

const Sidedrawer = (props) => {
    const auth = useContext(AuthContext);

    const [coverState, setCoverState] = useState({
        coverLink: ""
    });
    const [profileState, setProfileState] = useState({
        profileLink: "",
        name: "",
        email: ""
    });

    useEffect(() => {
        if (auth.loggedIn) {
            loadImages();
        }
    }, [auth.loggedIn])


    const loadImages = () => {
        let userDetails = JSON.parse(localStorage.getItem("userCred"));
        let UID = userDetails.uid;
        get_avatar_url(UID, (snapshot) => {
            var avatarUrl = snapshot.val();
            setProfileState({
                ...profileState,
                profileLink: avatarUrl,
                name: userDetails.displayName,
                email: userDetails.email
            })
        })

        get_background_url(UID, function (snapshot) {
            var background = snapshot.val();
            setCoverState({
                ...coverState,
                coverLink: background
            })
        })

    }

    let style;
    if (props.show) {
        style = {
            transform: "translateX(0)"
        }
    } else {
        style = {
            transform: "translateX(-100%)"
        }
    }

    let profile = <img className="Cover" src="https://firebasestorage.googleapis.com/v0/b/dif-instantgames.appspot.com/o/backgrounds%2Fimage-1-compressed(1).jpg?alt=media&token=fbe14164-5889-4695-a69a-a87ac07ef6e5" alt="Cover"></img>;
    if (auth.loggedIn) {
        profile =
            <>
                <img className="Cover" src={coverState.coverLink || "https://firebasestorage.googleapis.com/v0/b/dif-instantgames.appspot.com/o/backgrounds%2Fimage-1-compressed(1).jpg?alt=media&token=fbe14164-5889-4695-a69a-a87ac07ef6e5"} alt="Cover"></img>
                <Link to="/WebGamesPortal/user">
                    <img className="Profile" src={profileState.profileLink || "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"} alt="Profile" onClick={props.close}></img>
                    <h3 className="Sidename" onClick={props.close}>{profileState.name} </h3>
                    <h6 className="SideEmail" onClick={props.close}>{profileState.email} </h6>
                </Link>
            </>
    }

    const content =

        <React.Fragment>
            {props.show ? <Backdrop remove={props.close} /> : null}
            <div className="Sidedrawer" style={style}>
                <Container marginTop="15px">
                    <Link to="/WebGamesPortal">
                        <h1 className="PageName" onClick={props.close}>WGP</h1>
                    </Link>

                </Container>
                <div className="User"> {/* Conditional */}
                    {profile}
                </div>

                <Container marginTop="25px">
                    <SideNavElem shut={props.close} />
                </Container>
            </div>
        </React.Fragment>

    return ReactDOM.createPortal(content, document.getElementById("sidedrawer"));
}

export default Sidedrawer;