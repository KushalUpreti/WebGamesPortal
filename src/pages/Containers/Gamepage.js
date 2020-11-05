import React, { useState, useEffect } from 'react';
import Container from '../../shared/Containers/Container';
import IFrame from '../../pages/Components/IFrame';
import { withRouter } from 'react-router';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import firebase from '../../shared/Functions/FirebaseQuery';
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

        request_category(category, " ", 24);
    }, []);

    return (
        <>
            <h2 style={{ color: "white" }}>{props.location.title}</h2>
            <Container marginTop={0}>
                <IFrame path={props.location.data}>

                </IFrame>
            </Container>
            <Container>
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

    function receive_data_all(snapshot) {
        const newArray = [];
        snapshot.forEach(function (childSnapshot) {
            var gameId = childSnapshot.key;
            var name = (childSnapshot.val().name);
            var url = (childSnapshot.val().url);
            var imageUrl = (childSnapshot.val().imageUrl);
            var category = (childSnapshot.val().category);

            var newObject = {
                gameId,
                name,
                url,
                imageUrl,
                category
            }
            newArray.push(newObject);

        });
        stateFunction({
            ...state,
            gamelist: [...newArray], //Needs fixing
            dataLoaded: true
        })
    }

    // (ii)
    // Request 'All' games
    // To start from top, use: startAt = "<space>"
    function request_all(startAt, size) {

        var database;
        database = firebase.database().ref('/Game Collection/all');

        database = database.orderByKey().startAt(startAt).limitToFirst(size);

        database.once('value').then(receive_data_all);      // Callback at (i)
    }


    function request_category(category, startAt, size) {
        category = category.toLowerCase();

        var database;
        database = firebase.database().ref('/Game Collection/' + category);

        database = database.orderByKey().startAt(startAt).limitToFirst(size);

        database.once('value').then(function (snapshot) {

            snapshot.forEach(function (childSnapshot) {
                var gameId = childSnapshot.key;

                //Start at 'gameId', stop at size 1
                request_all(gameId, size);          // Using function (ii)
            });
        });
    }
}

export default withRouter(Gamepage);