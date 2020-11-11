import React, { useState, useEffect } from 'react';
import Container from '../../shared/Containers/Container';
import Search from '../../shared/UIElements/Search/Search';
import Dropdown from '../../shared/UIElements/Dropdown/Dropdown';
import SearchContext from '../../shared/Contexts/SearchContext';
import DiscoverCard from '../../shared/UIElements/DiscoverCards/DiscoverCard';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import { search, request_included_category_list, request_all, request_discover_cards } from '../../shared/Functions/Firebase';
import { withRouter } from 'react-router';

const Homepage = (props) => {

    const [state, setState] = useState({
        discoverList: [],
        searchKey: "",
        dataLoaded: false,
        login: false
    });

    const [categoryState, categoryFunction] = useState({
        categoryList: [],
    });

    useEffect(() => {
        request_included_category_list(categoryFunction);
        request_discover_cards(setState, state);
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