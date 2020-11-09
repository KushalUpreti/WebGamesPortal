import React, { useState, useEffect } from 'react';
import Container from '../../shared/Containers/Container';
import IFrame from '../../pages/Components/IFrame';
import { withRouter } from 'react-router';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import { request_category } from '../../shared/Functions/Firebase';
import GameCard from '../../shared/UIElements/GameCard/GameCard.js';


const Gamepage = (props) => {

    const [state, stateFunction] = useState({
        gamelist: [],
        dataLoaded: false
    });

    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        let category = params.get("category");
        const index = category.indexOf(",");
        if (index !== -1) {
            category = category.slice(0, index);
        }

        request_category(category, " ", 24, stateFunction, state);

    }, []);

    return (
        <>
            <h1 style={{ color: "white", paddingLeft: "10%" }}>{props.location.title}</h1>
            <Container marginTop={0}>
                <IFrame path={props.location.data}>

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
            </Container>
        </>)
}

export default withRouter(Gamepage);