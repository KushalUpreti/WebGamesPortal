import React, { useState, useEffect } from 'react';
import Container from '../../shared/Containers/Container';
import Search from '../../shared/UIElements/Search/Search';
import Dropdown from '../../shared/UIElements/Dropdown/Dropdown';
import SearchContext from '../../shared/Contexts/SearchContext';
import DiscoverCard from '../../shared/UIElements/DiscoverCards/DiscoverCard';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import firebase, { /*request_all, search, request_category*/ } from '../../shared/Functions/FirebaseQuery';
import { withRouter } from 'react-router'

const Homepage = (props) => {

    const [state, stateFunction] = useState({
        discoverList: [],
        searchKey: "",
        dataLoaded: false
    });


    const [categoryState, categoryFunction] = useState({
        categoryList: [],
    });



    useEffect(() => {
        request_included_category_list();
        request_discover_cards();
        // document.addEventListener('scroll', () => {
        //     if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
        //         console.log("Loading new data");
        //     }
        // })
    }, []);

    const searchHandler = (event) => {
        if (event.target.value.length > 0) {
            search(event.target.value, 12);

        } else {
            request_all(" ", state.itemCount);
        }
    }

    const changeHandler = (event) => {
        const value = event.target.value;
        props.history.push({
            pathname: "/category",
            search: `&category=${value}`,
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

            {
                state.dataLoaded ? state.discoverList.map(item => {
                    const id = item.title.slice(0, 15);
                    return <DiscoverCard
                        key={id}
                        category={item.category}
                        title={item.title}
                    ></DiscoverCard>
                }) : <Spinner />

            }
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

    function request_discover_cards() {
        var database;
        database = firebase.database().ref('/Discover Cards');

        database.once('value').then(function (snapshot) {

            // List with inluded categories: snapshot
            const newArray = [];
            // Get values like
            snapshot.forEach(function (childSnapshot) {
                var title = childSnapshot.val().title;
                var category = childSnapshot.val().category;

                const discCard = {
                    title,
                    category
                }
                newArray.push(discCard);
                // Now load the games from the category: request_category(category, START_AT, SIZE)
            });
            stateFunction({
                ...state,
                discoverList: [...newArray],
                dataLoaded: true
            })
        });
    }
}

export default withRouter(Homepage);