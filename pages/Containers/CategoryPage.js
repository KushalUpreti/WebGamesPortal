import React, { useState, useEffect } from 'react';
import Container from '../../shared/Containers/Container';
import Dropdown from '../../shared/UIElements/Dropdown/Dropdown';
import GameCard from '../../shared/UIElements/GameCard/GameCard';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import { request_category, request_included_category_list } from '../../shared/Functions/Firebase';
import { receive_data_all, categoryListCallback } from '../../shared/Functions/FirebaseCallbacks';
import { withRouter } from 'react-router';

const CategoryPage = (props) => {

    const params = new URLSearchParams(props.location.search);
    let category = params.get("category");

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
        loadStuff();
    }, [props]);

    const loadStuff = () => {
        request_included_category_list((snapshot) => {
            const array = categoryListCallback(snapshot);
            categoryFunction({
                categoryList: [...array]
            })
        })

        request_category(category, " ", 24, (snapshot) => {
            const array = receive_data_all(snapshot);
            setState(prevstate => {
                const newState = {
                    ...state,
                    gameList: [...prevstate.gameList, ...array],
                    dataLoaded: true
                }
                return newState;
            })
        })
    }

    const changeHandler = (event) => {
        const value = event.target.value;
        setState({
            ...state,
            gameList: []
        })
        props.history.push({
            pathname: "/WebGamesPortal/category",
            search: `&category=${value}`
        })
    }

    return (
        <>
            <Container>
                <div></div>

                <Dropdown change={changeHandler}>
                    <option value="" defaultValue="selected" disabled="disabled">Genre</option>
                    {categoryState.categoryList.map(item => {
                        return <option key={item} value={item}>{item}</option>
                    })}
                </Dropdown>
            </Container>

            <h1 style={{ color: "white", paddingLeft: "10%", marginTop: "40px", textTransform: "capitalize" }}>{category}</h1>

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
}

export default withRouter(CategoryPage);