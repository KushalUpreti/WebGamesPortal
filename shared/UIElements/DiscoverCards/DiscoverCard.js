import React, { useState, useEffect } from 'react';
import Container from '../../Containers/Container';
import GameCard from '../GameCard/GameCard';
import firebase from '../../Functions/FirebaseQuery';
import Spinner from '../Spinner/Spinner';
import { NavLink } from 'react-router-dom'
import './DiscoverCard.css'


const DiscoverCard = (props) => {

    const [state, stateFunction] = useState({
        gamelist: [],
        dataLoaded: false
    });

    useEffect(() => {
        request_category(props.category, " ", 6);
    }, []);

    return (
        <React.Fragment>
            <div>
                <Container>
                    <h2 >
                        {props.title}
                    </h2>
                    <NavLink to={{
                        pathname: "/category",
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
export default DiscoverCard;