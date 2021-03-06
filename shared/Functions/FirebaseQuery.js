import firebase from 'firebase';

let stateFunction = null;
let state = null;

export var config = {
    apiKey: "AIzaSyCa21G1mEhrJKmoPLRZ8hbJikyI4lGdY5Y",
    authDomain: "dif-instantgames.firebaseapp.com",
    databaseURL: "https://dif-instantgames.firebaseio.com/",
    storageBucket: "dif-instantgames.appspot.com",
};

firebase.initializeApp(config);
export default firebase;

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
export function request_all(startAt, size, stateFunc, stateInput) {
    stateFunction = stateFunc;
    state = stateInput;

    var database;
    database = firebase.database().ref('/Game Collection/all');

    database = database.orderByKey().startAt(startAt).limitToFirst(size);

    database.once('value').then(receive_data_all);      // Callback at (i)
}

export function search(keyword, size, stateFunc, stateInput) {
    stateFunction = stateFunc;
    state = stateInput;


    keyword = keyword.toLowerCase();
    var database;
    database = firebase.database().ref('/Game Collection/search index');

    database = database.orderByValue().startAt(keyword).limitToFirst(size);

    database.once('value').then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            var gameId = childSnapshot.key;

            //Start at 'gameId', stop at size 1
            request_all(gameId, 1, stateFunction, state,);         // Using function (ii)
        });
    });
}

export function request_category(category, startAt, size, stateFunction, state) {
    category = category.toLowerCase();

    var database;
    database = firebase.database().ref('/Game Collection/' + category);

    database = database.orderByKey().startAt(startAt).limitToFirst(size);

    database.once('value').then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            var gameId = childSnapshot.key;

            //Start at 'gameId', stop at size 1
            request_all(gameId, size, stateFunction, state);          // Using function (ii)
        });
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
        // setState({
        //     ...state,
        //     discoverList: [...newArray],
        //     dataLoaded: true
        // })
    });
}

function request_included_category_list(stateFunction) {
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
        stateFunction({
            categoryList: [...newArray],
        })
    });

}





