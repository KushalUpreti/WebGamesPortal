import React, { Component } from 'react';
import Container from '../../shared/Containers/Container';
import Search from '../../shared/UIElements/Search/Search';
import Dropdown from '../../shared/UIElements/Dropdown/Dropdown';
import GameCard from '../../shared/UIElements/GameCard/GameCard.js';
import SearchContext from '../../shared/Contexts/SearchContext';
import Spinner from '../../shared/UIElements/Spinner/Spinner';
import firebase from '../../shared/Functions/FirebaseQuery';

class Homepage extends Component {
    state = {
        gamelist: [],
        searchKey: "",
        dataLoaded: false
    }

    constructor(props) {
        super(props);


        document.addEventListener('scroll', () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
                console.log("Loading new data");
            }
        })
    }

    componentDidMount() {
        this.request_all(" ", 30);
    }

    searchHandler = (event) => {
        if (event.target.value.length > 0) {
            this.search(event.target.value, 12);
        } else {
            this.request_all(" ", this.state.itemCount);
        }
    }

    changeHandler = (event) => {
        const value = event.target.value;
        this.request_category(value, " ", 24);
    }

    render() {
        return (

            <>
                <Container>
                    <SearchContext.Provider value={{
                        value: this.state.searchKey,
                        searchItem: this.searchHandler
                    }}>
                        <Search />
                    </SearchContext.Provider>

                    <Dropdown change={this.changeHandler}>
                        <option value="" defaultValue="selected" disabled="disabled">Genre</option>
                        <option value="All">All</option>
                        <option value="New">New</option>
                        <option value="Best">Best</option>
                        <option value="Arcade">Arcade</option>
                        <option value="3D">3D</option>
                        <option value="Racing">Racing</option>
                        <option value="Action">Action</option>
                        <option value="Skill">Skill</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Shooting">Shooting</option>
                        <option value="Sports">Sports</option>
                        <option value="Platform">Platform</option>
                        <option value="Educational">Educational</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Board and Card">Board and Card</option>
                        <option value="Casino">Casino</option>
                        <option value="Classics">Classics</option>
                    </Dropdown>
                </Container>
                <Container>
                    {
                        this.state.dataLoaded ? this.state.gamelist.map(item => {
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

    receive_data_all = (snapshot) => {
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
        this.setState({
            gamelist: [...newArray], //Needs fixing
            dataLoaded: true
        })
    }

    request_all = (startAt, size) => {

        var database;
        database = firebase.database().ref('/Game Collection/all');

        database = database.orderByKey().startAt(startAt).limitToFirst(size);

        database.once('value').then(this.receive_data_all);      // Callback at (i)
    }

    search = (keyword, size) => {

        keyword = keyword.toLowerCase();
        var database;
        database = firebase.database().ref('/Game Collection/search index');

        database = database.orderByValue().startAt(keyword).limitToFirst(size);

        database.once('value').then(function (snapshot) {

            snapshot.forEach(function (childSnapshot) {
                var gameId = childSnapshot.key;

                //Start at 'gameId', stop at size 1
                this.request_all(gameId, 1);         // Using function (ii)
            });
        });
    }

    request_category(category, startAt, size) {
        category = category.toLowerCase();

        var database;
        database = firebase.database().ref('/Game Collection/' + category);

        database = database.orderByKey().startAt(startAt).limitToFirst(size);

        database.once('value').then(function (snapshot) {

            snapshot.forEach(function (childSnapshot) {
                var gameId = childSnapshot.key;

                //Start at 'gameId', stop at size 1

                window.request_all(gameId, size);          // Using function (ii)
            });
        });
    }
}

export default Homepage;