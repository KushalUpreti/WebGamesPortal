import React, { useState, useEffect, useCallback } from 'react';
import Container from '../../shared/Containers/Container';
import Search from '../../shared/UIElements/Search/Search';
import Dropdown from '../../shared/UIElements/Dropdown/Dropdown';
import SearchContext from '../../shared/Contexts/SearchContext';
import DiscoverCard from '../../shared/UIElements/DiscoverCards/DiscoverCard';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import { request_included_category_list, request_discover_cards, search } from '../../shared/Functions/Firebase';
import { categoryListCallback, discoverCardCallback } from '../../shared/Functions/FirebaseCallbacks';
import { withRouter } from 'react-router';
import RenderList from '../../shared/Containers/RenderList';

const Homepage = (props) => {

    const [state, setState] = useState({
        discoverList: [],
        dataLoaded: false,
        login: false,
        searching: false
    });

    const [categoryState, categoryFunction] = useState({
        categoryList: [],
    });

    const [searchState, searchFunction] = useState({
        searchList: [],
        searching: false
    })

    useEffect(() => {
        loadAllCategory();
    }, []);

    // const searchHandler = (event) => {

    //     if (event.target.value.length > 0) {
    //         search(event.target.value, 5, (snapshot) => {
    //             let array = request_gameCallback(snapshot);
    //             if (event.target.value.length > 0) {
    //                 searchFunction(prevState => {
    //                     const newArray = {
    //                         searchList: [...prevState.searchList, array],
    //                         searching: true
    //                     }
    //                     return newArray
    //                 })
    //             }
    //         })
    //     } else {
    //         searchFunction({
    //             searchList: [],
    //             searching: false
    //         })
    //     }
    // }


    const loadAllCategory = useCallback(() => {
        request_included_category_list((snapshot) => {
            const array = categoryListCallback(snapshot);
            categoryFunction({
                categoryList: [...array]
            })
        })
        request_discover_cards((snapshot) => {
            const array = discoverCardCallback(snapshot);
            setState({
                ...state,
                discoverList: [...array],
                dataLoaded: true
            })
        })
    }, [state]);

    const changeHandler = (event) => {
        const value = event.target.value;
        props.history.push({
            pathname: "/WebGamesPortal/category",
            search: `&category=${value}`,
        });
    }

    return (
        <>
            <Container>
                <SearchContext.Provider value={{
                    text: searchState.searchKey,
                    // searchItem: searchHandler
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

            {searchState.searching ? <h2 style={{ color: "white", paddingLeft: "10%" }}>Searching</h2> : null}
            {searchState.searching ? <Container marginTop="15px">
                {searchState.searching ? <RenderList list={searchState.searchList}></RenderList>
                    : null}
            </Container> : null}

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
}

export default withRouter(Homepage);