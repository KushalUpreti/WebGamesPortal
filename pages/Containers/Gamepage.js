import React, { useState, useEffect } from 'react';
import Container from '../../shared/Containers/Container';
import IFrame from '../../pages/Components/IFrame';
import { withRouter } from 'react-router';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import { request_category, request_all } from '../../shared/Functions/Firebase';
import { receive_data_all } from '../../shared/Functions/FirebaseCallbacks';
import GameCard from '../../shared/UIElements/GameCard/GameCard.js';
import hearts from '../../assets/hearts.png';
import red from '../../assets/red.png';
import './Gamepage.css'


const Gamepage = (props) => {

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

    const [fav, setfav] = useState({
        isFav: false
    });

    useEffect(() => {
        loadGames();
        // document.addEventListener('scroll', addScroll(category,state.lastIndex,setState,state));
    }, []);

    const loadGames = () => {

        const params = new URLSearchParams(props.location.search);
        let category = params.get("category");
        let id = params.get("id");

        const index = category.indexOf(",");
        if (index !== -1) {
            category = category.slice(0, index);
        }

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

    const setFavorite = () => {

        setfav(prevState => {

            const state = {
                isFav: !prevState.isFav
            }
            return state;
        })
    }

    return (
        <>
            <Container>
                <h1 style={{ color: "white" }}>{link.title}</h1>
                <div>
                    <img className="Favorites_img"
                        onClick={setFavorite} alt="fav"
                        src={!fav.isFav ? hearts : red}></img>
                    <h3 className="Favorites_h3"
                    >Add to favorites</h3>
                </div>

            </Container>

            <Container marginTop={0}>
                <IFrame path={link.gameLink}>

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