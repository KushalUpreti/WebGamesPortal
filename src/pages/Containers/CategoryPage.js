import React, { useState, useEffect, useCallback } from 'react';
import Container from '../../shared/Containers/Container';
import Dropdown from '../../shared/UIElements/Dropdown/Dropdown';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import { request_category, request_included_category_list } from '../../shared/Functions/Firebase';
import { receive_data_all, categoryListCallback } from '../../shared/Functions/FirebaseCallbacks';
import { withRouter } from 'react-router';
import classes from './Heading.module.css';
import RenderList from '../../shared/Containers/RenderList';

const CategoryPage = (props) => {

    const params = new URLSearchParams(props.location.search);
    let category = params.get("category");

    const [state, setState] = useState({
        gameList: [],
        dataLoaded: false,
        newLoaded: true
    });

    const [categoryState, categoryFunction] = useState({
        categoryList: [],
        value: "Genre",
    });

    useEffect(() => {
        document.addEventListener('scroll', loadMore);
        console.log("Category called");
        loadStuff();
        return () => {
            document.removeEventListener('scroll', loadMore);
        }
    }, []);

    const loadStuff = () => {
        request_included_category_list((snapshot) => {
            const array = categoryListCallback(snapshot);
            categoryFunction({
                ...state,
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
        console.log(state);
        const values = event.target.value;
        setState({
            ...state,
            gameList: []
        })
        props.history.push({
            pathname: "/WebGamesPortal/category",
            search: `&category=${values}`
        })
    }

    const loadMore = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            console.log("Bottom");
        }
    }, [])

    return (
        <>
            <Container>
                <div className={classes.Empty}></div>

                <Dropdown valueProp={categoryState.value} change={changeHandler}>
                    {categoryState.categoryList.map(item => {
                        return <option key={item} value={item}>{item}</option>
                    })
                    }
                </Dropdown>
            </Container>

            <h1 className={classes.Category_h1}>{category}</h1>

            <Container scroll={true} marginTop="15px">

                {
                    state.dataLoaded ? <RenderList tiny={true} list={state.gameList}></RenderList> : <Spinner />
                }
                {state.newLoaded ? null : <Spinner />}
            </Container>
        </>
    );
}

export default withRouter(CategoryPage);