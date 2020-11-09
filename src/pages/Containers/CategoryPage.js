import React, { useState, useEffect } from 'react';
import Container from '../../shared/Containers/Container';
import Search from '../../shared/UIElements/Search/Search';
import Dropdown from '../../shared/UIElements/Dropdown/Dropdown';
import SearchContext from '../../shared/Contexts/SearchContext';
import GameCard from '../../shared/UIElements/GameCard/GameCard';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import { request_category, request_included_category_list, search, request_all } from '../../shared/Functions/Firebase';
import { withRouter } from 'react-router';
import { addScroll } from '../../shared/Functions/LoadMore';

const CategoryPage = (props) => {
    const params = new URLSearchParams(props.location.search);
    let category = params.get("category");

    const [state, setState] = useState({
        gameList: [],
        searchKey: "",
        dataLoaded: false
    });

    const [categoryState, categoryFunction] = useState({
        categoryList: [],
    });

    useEffect(() => {
        request_included_category_list(categoryFunction);
        const params = new URLSearchParams(props.location.search);

        let category = params.get("category");
        request_category(category, " ", 24, categoryFunction, categoryState);
    }, []);

    const searchHandler = (event) => {
        if (event.target.value.length > 0) {
            search(event.target.value, 12, setState, state);

        } else {
            request_all(" ", state.itemCount, setState, state);
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
            </Container>
        </>
    );
}

export default withRouter(CategoryPage);