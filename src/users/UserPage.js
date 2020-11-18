import React, { useState, useEffect } from 'react';
import Container from '../shared/Containers/Container';
import Minibar from '../shared/UIElements/MiniBar/Minibar';
import { get_favorites, get_history, get_avatar_list, get_avatar_url, change_avatar, get_background_url, change_background, get_background_list } from '../shared/Functions/Firebase';
import { searchCallback, request_gameCallback, } from '../shared/Functions/FirebaseCallbacks';
import Spinner from '../shared/UIElements/Spinner/Spinner';
import edit from '../assets/edit.png'
import './UserPage.css';
import RenderList from '../shared/Containers/RenderList';
import Modal from './Profile_Modal/Profile_Modal';

const UserPage = () => {
    let userDetails = JSON.parse(localStorage.getItem("userCred"));
    let UID = userDetails.uid;
    let userName = userDetails.displayName;

    const [favState, setFavState] = useState({
        gamelist: [],
        noData: false,
        dataLoaded: false
    });

    const [profileState, setProfileState] = useState({
        profileURL: ""
    })

    const [coverState, setCoverState] = useState({
        coverURL: ""
    })

    const [historyState, setHistoryState] = useState({
        gamelist: [],
        dataLoaded: false,
        noData: false
    })

    const [allState, setAllState] = useState({
        currentMode: "Favorites"
    })

    const [modalState, setModalState] = useState({
        showProfileModal: false,
        profileData: [],
        showCoverModal: false,
        coverData: []
    })

    useEffect(() => {
        loadImages();
        loadFavorites();
    }, [])

    const showProfileModalHandler = () => {

        get_avatar_list((snapshot) => {
            let array = [];
            snapshot.forEach(function (childSnapshot) {
                var avatarId = childSnapshot.key;          // avatar key (usually numeric sequence starting from '1')
                var avatarUrl = childSnapshot.val();
                const obj = {
                    avatarId,
                    avatarUrl
                }
                array.push(obj);
            });
            setModalState({
                ...modalState,
                showProfileModal: true,
                profileData: [...array]
            }
            )
        })

        setModalState(prevState => {
            const newState = {
                ...prevState,
                showProfileModal: true
            }
            return newState;
        })
    }
    const hideProfileModalHandler = () => {
        setModalState({
            ...modalState,
            showProfileModal: false
        })
    }
    const showCoverModalHandler = () => {
        let array = [];
        get_background_list(function (snapshot) {

            snapshot.forEach(function (childSnapshot) {
                var backgroundImageId = childSnapshot.key;      // background key (usually numeric sequence starting from '1')
                var backgroundUrl = childSnapshot.val()     // background url

                const obj = {
                    backgroundImageId,
                    backgroundUrl
                }
                array.push(obj);
            });
            setModalState({
                ...modalState,
                showCoverModal: true,
                coverData: array
            })
        });
        setModalState({
            ...modalState,
            showCoverModal: true,
        })
    }
    const hideCoverModalHandler = () => {
        setModalState({
            ...modalState,
            showCoverModal: false
        })
    }

    const loadImages = () => {
        get_avatar_url(UID, (snapshot) => {
            var avatarUrl = snapshot.val();
            setProfileState({
                ...profileState,
                profileURL: avatarUrl
            })
        })

        get_background_url(UID, function (snapshot) {
            var background = snapshot.val();
            setCoverState({
                ...coverState,
                coverURL: background
            })
        })
    }

    const loadFavorites = () => {

        setFavState({
            ...favState,
            noData: false,
            gamelist: [],
            dataLoaded: false
        })

        setAllState({
            currentMode: "Favorites"
        })

        get_favorites(UID, (snapshot) => {
            let array = searchCallback(snapshot);
            setFavState(prevState => {
                const newState = {
                    ...favState,
                    gamelist: [...prevState.gamelist, ...array],
                    dataLoaded: true,
                }
                return newState;
            })
        })
        setTimeout(() => {
            setFavState(prevState => {
                if (!prevState.dataLoaded) {
                    const newState = {
                        ...prevState,
                        noData: true
                    }
                    return newState;
                }
                return prevState;
            })
        }, 5000)

    }

    const loadHistory = () => {
        setAllState({
            currentMode: "History"
        })
        setHistoryState({
            ...historyState,
            noData: false,
            gamelist: [],
            dataLoaded: false
        })
        get_history(UID, (snapshot) => {
            const value = request_gameCallback(snapshot);
            setHistoryState(prevState => {
                const newArray = [...prevState.gamelist];
                newArray.push(value);
                const newState = {
                    ...prevState,
                    gamelist: [...newArray],
                    dataLoaded: true,
                    noData: false
                }
                return newState;
            })
        })

        setTimeout(() => {
            setHistoryState(prevState => {
                if (!prevState.dataLoaded) {
                    const newState = {
                        ...prevState,
                        noData: true
                    }
                    return newState;
                }
                return prevState;
            })
        }, 5000)
    }


    const setAvatar = (url, id) => {
        change_avatar(UID, id, function (error) {
            if (error) {
                alert("Could not change avatar")
            } else {
                setProfileState({
                    ...profileState,
                    profileURL: url
                });
                hideProfileModalHandler();
            }
        });
    }

    const setCover = (url, id) => {
        change_background(UID, id, function (error) {
            if (error) {
                alert("Changing cover failed");
            } else {
                setCoverState({
                    ...coverState,
                    coverURL: url
                });
                hideCoverModalHandler();
            }
        });
    }


    let data = null;
    if (allState.currentMode === "Favorites") {
        if (favState.dataLoaded) {
            data = <RenderList list={favState.gamelist}></RenderList>
        } else if (!favState.dataLoaded && favState.noData) {
            data = <h2 style={{ color: "red", margin: "auto", fontFamily: "sans-serif" }}>Sorry. No favorites found. Add favorites or <br />refresh to try again.</h2>
        } else {
            data = <Spinner />
        }
    } else if (allState.currentMode === "History") {
        if (historyState.dataLoaded) {
            data = <RenderList list={historyState.gamelist}></RenderList>
        } else if (!historyState.dataLoaded && historyState.noData) {
            data = <h2 style={{ color: "red", margin: "auto", fontFamily: "sans-serif" }}>Sorry. No history found. Play some games or <br />refresh to try again.</h2>
        } else {
            data = <Spinner />
        }
    }

    return (
        <>
            <Container marginTop="0">
                <div>
                    <img alt="cover_image" className="Cover_img" src={coverState.coverURL}></img>
                    <div className="Cover_edit" onClick={showCoverModalHandler}>
                        <img src={edit} alt="Edit Profile"></img>
                        <h6>Edit cover</h6>
                    </div>
                </div>
                <div>
                    <img alt="profile_img" className="Profile_img" src={profileState.profileURL}></img>
                    <div className="Profile_edit" onClick={showProfileModalHandler}>
                        <img src={edit} alt="Edit Profile"></img>
                    </div>
                </div>

            </Container>
            <h1 className="Username">{userName}</h1>
            <Minibar loadFav={loadFavorites} loadHistory={loadHistory} />

            {modalState.showCoverModal ? <Modal data={modalState.coverData}
                hide={hideCoverModalHandler}
                show={modalState.showCoverModal}
                function={setCover}
                text="Choose a Cover" /> : null}

            {modalState.showProfileModal ? <Modal data={modalState.profileData}
                hide={hideProfileModalHandler}
                show={modalState.showProfileModal}
                function={setAvatar}
                text="Choose an Avatar" /> : null}

            {favState.dataLoaded ? <h1 className="Userpage_h1">{allState.currentMode}</h1> : null}

            <Container justify="flex-start" marginTop="10px" marginBottom="20px">
                {
                    data
                }
            </Container>
        </>
    )
}

export default UserPage;