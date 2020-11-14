import React, { useState, useEffect, useContext } from 'react';
import Container from '../../shared/Containers/Container';
import IFrame from '../../pages/Components/IFrame';
import { withRouter } from 'react-router';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import { request_category, request_all, check_if_favorite, add_to_favorites, remove_from_favorites } from '../../shared/Functions/Firebase';
import { receive_data_all } from '../../shared/Functions/FirebaseCallbacks';
import GameCard from '../../shared/UIElements/GameCard/GameCard.js';
import hearts from '../../assets/hearts.png';
import red from '../../assets/red.png';
import './Gamepage.css';
import AuthContext from '../../shared/Contexts/AuthContext';



const Gamepage = (props) => {
    const auth = useContext(AuthContext);
    const params = new URLSearchParams(props.location.search);
    let category = params.get("category");
    let id = params.get("id")

    const [state, setState] = useState({
        gamelist: [],
        dataLoaded: false,
        loadingMore: false,
        lastIndex: " "
    });

    const [link, setLink] = useState({
        title: "",
        gameLink: "",
    })

    const [fav, setFav] = useState({
        isFav: false,
    });

    useEffect(() => {
        loadGames();
        checkFav();
    }, []);

    const loadGames = () => {

        const index = category.indexOf(",");
        if (index !== -1) {
            category = category.slice(0, index);
        }
        let id = params.get("id")
        request_all(id, 1, (snapshot) => {
            let array = receive_data_all(snapshot);
            setLink({
                ...link,
                title: array[0].name,
                gameLink: array[0].url
            })
        })

        request_category(category, " ", 24, (snapshot) => {
            const array = receive_data_all(snapshot);
            setState(prevstate => {
                const newState = {
                    ...state,
                    gamelist: [...prevstate.gamelist, ...array],
                    dataLoaded: true
                }
                return newState;
            })
        })
    }

    const checkFav = () => {

        if (localStorage.getItem("userCred") !== null) {
            let userDetails = JSON.parse(localStorage.getItem("userCred"));
            let UID = userDetails.uid;
            check_if_favorite(UID, id, function (snapshot) {
                if (snapshot.val()) {
                    setFav({
                        isFav: true
                    })
                }
            });
        }
    }

    const setFavorite = () => {
        let userDetails = JSON.parse(localStorage.getItem("userCred"));
        let UID = userDetails.uid;
        if (!fav.isFav) {
            add_to_favorites(UID, id, function (error) {
                if (error) {
                    alert("Adding to favorites failed")
                } else {
                    setFav({
                        isFav: true
                    })
                }
            });
        } else {
            remove_from_favorites(UID, id, function (error) {
                if (error) {
                    alert("Removing favorites failed...");
                } else {
                    setFav({
                        isFav: false
                    })
                }
            });
        }

    }

    return (
        <>
            <Container>
                <h1 style={{ color: "white" }}>{props.location.title || link.title}</h1>
                {
                    auth.loggedIn ? <div>
                        <img className="Favorites_img"
                            onClick={setFavorite} alt="fav"
                            src={!fav.isFav ? hearts : red}></img>
                        <h3 className="Favorites_h3"
                        >{fav.isFav ? "Added to favorites" : "Add to favorites"}</h3>
                    </div> : null
                }


            </Container>

            <Container marginTop={0}>
                <IFrame path={props.location.data || link.gameLink}>

                </IFrame>
            </Container>
            <h1 style={{ color: "white", paddingLeft: "10%", marginTop: "50px" }}>Similar games</h1>
            <Container marginTop="10px">
                {
                    state.dataLoaded ? state.gamelist.map(item => {
                        return <GameCard
                            key={item.gameId}
                            url={item.imageUrl}
                            gameUrl={item.url}
                            title={item.name}
                            id={item.gameId}
                            category={item.category}
                        ></GameCard>
                    }) : <Spinner />
                }
                {state.loadingMore ? <Spinner /> : null}
            </Container>
        </>)
}

export default withRouter(Gamepage);