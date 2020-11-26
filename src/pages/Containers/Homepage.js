import React, { useState, useEffect, useCallback } from 'react';
import Container from '../../shared/Containers/Container';
import Search from '../../shared/UIElements/Search/Search';
import Dropdown from '../../shared/UIElements/Dropdown/Dropdown';
import SearchContext from '../../shared/Contexts/SearchContext';
import DiscoverCard from '../../shared/UIElements/DiscoverCards/DiscoverCard';
import Spinner from '../../shared/UIElements/TestSpinner/TestSpinner';
import Carousel from '../../shared/UIElements/Carousel/Carousel';
import { request_included_category_list, request_discover_cards, search, get_game_teasers } from '../../shared/Functions/Firebase';
import { categoryListCallback, discoverCardCallback, game_teaserCallback } from '../../shared/Functions/FirebaseCallbacks';
import { withRouter } from 'react-router';
import RenderList from '../../shared/Containers/RenderList';

const Homepage = (props) => {

    const [state, setState] = useState({
        discoverList: [],
        dataLoaded: false,
        login: false,
        searching: false
    });

    const [carouselState, setCarouselState] = useState({
        carouselList: [],
        carouselListLoaded: false
    })

    const [categoryState, categoryFunction] = useState({
        categoryList: [],
    });

    const [searchState, searchFunction] = useState({
        searchList: [],
        searching: false
    })

    useEffect(() => {
        loadCarouselContent();
        loadAllCategory();
        console.log(document.querySelector("BrainhubCarousel__arrows BrainhubCarousel__arrowLeft"));
    }, []);


    const searchHandler = (event) => {

        if (event.target.value.length > 0) {
            searchFunction({
                searchList: [],
                searching: true
            })

            search(event.target.value, 5, function (snapshot) {
                if (snapshot.val() == null) {

                    // For cleaning 'search index' database 'NOT REQUIRED BUT USEFUL'
                    // firebase.database().ref('/Game Collection/search index/'+snapshot.key).set(null);
                    //
                    console.log("Database doesn't exist");
                    return;
                }
                console.log("Searching");
                let array = [];
                var gameId = snapshot.key;
                var name = snapshot.val().name;
                var url = snapshot.val().url;
                var imageUrl = snapshot.val().imageUrl;
                var category = snapshot.val().category;

                const obj = {
                    gameId,
                    name,
                    url,
                    imageUrl,
                    category
                }
                array.push(obj);
                searchFunction(prevState => {
                    if (prevState.searchList.find((item) => {
                        return item.gameId === obj.gameId;
                    }) === undefined) {
                        const newState = {
                            ...prevState,
                            searchList: [...prevState.searchList, ...array]
                        }
                        return newState;
                    } else {
                        return prevState;
                    }
                })
            });
        } else {
            searchFunction({
                searchList: [],
                searching: false
            })
        }
    }

    const loadCarouselContent = () => {
        get_game_teasers((snapshot) => {
            const values = game_teaserCallback(snapshot);
            setCarouselState({
                ...carouselState,
                carouselList: [...values],
                carouselListLoaded: true
            })
        })
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
            pathname: "/WebGamesPortal/category",
            search: `&category=${value}`,
        });
    }

    return (
        <>
            <Container>
                <SearchContext.Provider value={{
                    text: searchState.searchKey,
                    searchItem: searchHandler
                }}>
                    <Search />
                </SearchContext.Provider>

                <Dropdown change={changeHandler}>
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

            {carouselState.carouselListLoaded ? <Container>
                <Carousel itemList={carouselState.carouselList} />
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