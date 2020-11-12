import React, { useState, useEffect, useCallback } from 'react';
import Container from '../../shared/Containers/Container';
import Search from '../../shared/UIElements/Search/Search';
import Dropdown from '../../shared/UIElements/Dropdown/Dropdown';
import SearchContext from '../../shared/Contexts/SearchContext';
import DiscoverCard from '../../shared/UIElements/DiscoverCards/DiscoverCard';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import { request_included_category_list, request_discover_cards } from '../../shared/Functions/Firebase';
import { categoryListCallback, discoverCardCallback } from '../../shared/Functions/FirebaseCallbacks';
import { withRouter } from 'react-router';

const Homepage = (props) => {

    const [state, setState] = useState({
        discoverList: [],
        searchKey: "",
        dataLoaded: false,
        login: false,
        searching: false
    });

    const [categoryState, categoryFunction] = useState({
        categoryList: [],
    });

    useEffect(() => {
        loadAllCategory();
    }, []);

    const searchHandler = (event) => {
        if (event.target.value.length > 0) {
            setState({
                ...state,
                searching: true
            })
        } else {
            setState({
                ...state,
                searching: false
            })
        }
    }

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
            pathname: "/category",
            search: `&category=${value}`,
        });
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
            {state.searching ? null : <>
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
            </>}
        </>
    );
}

export default withRouter(Homepage);