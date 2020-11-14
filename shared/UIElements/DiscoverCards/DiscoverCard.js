import React, { useState, useEffect } from 'react';
import Container from '../../Containers/Container';
import GameCard from '../GameCard/GameCard';
import { request_category } from '../../Functions/Firebase';
import { receive_data_all } from '../../Functions/FirebaseCallbacks';
import Spinner from '../Spinner/Spinner';
import { NavLink } from 'react-router-dom'
import './DiscoverCard.css'

const DiscoverCard = (props) => {

    const [state, setState] = useState({
        gamelist: [],
        dataLoaded: false
    });

    useEffect(() => {
        loadStuff();
    }, []);

    const loadStuff = () => {

        request_category(props.category, " ", 6, (snapshot) => {
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

    return (
        <React.Fragment>
            <div>
                <Container>
                    <h2 >
                        {props.title}
                    </h2>
                    <NavLink to={{
                        pathname: "/WebGamesPortal/category",
                        search: `&category=${props.category}`,
                    }}>
                        More
                    </NavLink>
                </Container>
                <Container
                    marginTop="10px">
                    {state.dataLoaded ? state.gamelist.map(item => {
                        return <GameCard
                            key={item.gameId}
                            url={item.imageUrl}
                            gameUrl={item.url}
                            title={item.name}
                            id={item.gameId}
                            category={item.category}
                        ></GameCard>
                    }) : <Spinner />}
                </Container>
            </div>
        </React.Fragment>
    )
}
export default DiscoverCard;