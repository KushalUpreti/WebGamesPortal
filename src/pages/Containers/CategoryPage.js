import React, { useState, useEffect } from 'react';
import Container from '../../shared/Containers/Container';
import Search from '../../shared/UIElements/Search/Search';
import Dropdown from '../../shared/UIElements/Dropdown/Dropdown';
import SearchContext from '../../shared/Contexts/SearchContext';
import GameCard from '../../shared/UIElements/GameCard/GameCard';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import firebase from '../../shared/Functions/Firebase';
import { withRouter } from 'react-router';
import { addScroll } from '../../shared/Functions/LoadMore';
import useConstructor from '../../shared/Functions/useConstructor';

let propSend = null;
let funcSend = null;

const CategoryPage = (props) => {
    const params = new URLSearchParams(props.location.search);
    let category = params.get("category");

    useConstructor(() => {
        console.log(
            "This only happens ONCE and it happens BEFORE the initial render."
        );

    });

    const [state, setState] = useState({
        gameList: [],
        searchKey: "",
        dataLoaded: false,
        newLoaded: true
    });

    const [categoryState, categoryFunction] = useState({
        categoryList: [],
    });

    useEffect(() => {
        request_included_category_list();
        const params = new URLSearchParams(props.location.search);
        let category = params.get("category");

        propSend = props;
        funcSend = request_category;
        request_category(category, " ", 24);
    }, []);

    const searchHandler = (event) => {
        if (event.target.value.length > 0) {
            // search(event.target.value, 12, setState, state);

        } else {
            request_all(" ", state.itemCount);
        }
    }

    const changeHandler = (event) => {
        const value = event.target.value;
        props.history.push({
            pathname: "/category",
            search: `&category=${value}`
        })
    }

    return (
        <>
            <Container>
                <SearchContext.Provider value={{
                    value: state.searchKey,
                    searchItem: searchHandler
                }}>
                    <Search />
                </SearchContext.Provider>

                <Dropdown change={changeHandler}>
                    <option value="" defaultValue="selected" disabled="disabled">Genre</option>
                    {categoryState.categoryList.map(item => {
                        return <option key={item} value={item}>{item}</option>
                    })}

                </Dropdown>
            </Container>
            <h1 style={{ color: "white", paddingLeft: "10%", marginTop: "40px" }}>{category}</h1>
            <Container marginTop="15px">

                {
                    state.dataLoaded ? state.gameList.map(item => {
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
                {state.newLoaded ? null : <Spinner />}
            </Container>
        </>
    );

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

        console.log(newArray.length);

        setState({
            ...state,
            gameList: [...newArray], //Needs fixing
            dataLoaded: true,
            newLoaded: true
        });
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

    function search(keyword, size) {

        keyword = keyword.toLowerCase();
        var database;
        database = firebase.database().ref('/Game Collection/search index');

        database = database.orderByValue().startAt(keyword).limitToFirst(size);

        database.once('value').then(function (snapshot) {

            snapshot.forEach(function (childSnapshot) {
                var gameId = childSnapshot.key;

                //Start at 'gameId', stop at size 1
                request_all(gameId, 1);         // Using function (ii)
            });
        });
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

    function request_included_category_list() {
        var database;
        database = firebase.database().ref('/Game Collection/Categories Included');
        let newArray = [];
        database.once('value').then(function (snapshot) {

            // List with inluded categories: snapshot

            // Get values like
            snapshot.forEach(function (childSnapshot) {
                var category = childSnapshot.val();
                newArray.push(category);
            });
            categoryFunction({
                categoryList: [...newArray],
            })
        });

    }
}

export function callback() {
    const params = new URLSearchParams(propSend.location.search);
    let category = params.get("category");
    let catFucntion = funcSend;

    return [category, catFucntion];
}

export default withRouter(CategoryPage);