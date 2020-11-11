import dotenv from 'dotenv'
import firebase from 'firebase';
import "firebase/auth";
dotenv.config()

export var config = {
    apiKey: "AIzaSyC1iIknhchQD0_l92tVQXI6wk1NMLc2VPE",
    authDomain: "dif-instantgames.firebaseapp.com",
    databaseURL: "https://dif-instantgames.firebaseio.com/",
    storageBucket: "dif-instantgames.appspot.com",
};

firebase.initializeApp(config);
export default firebase;

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = (signInFunction) => {
    auth.signInWithPopup(googleProvider).then((res) => {
        console.log(res.user);
        localStorage.setItem("userCred", JSON.stringify(res.user));
        signInFunction();

    }).catch((error) => {
        console.log(error.message)
    })
}

let state = null;
let setState = null;

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
    setState({
        ...state,
        gamelist: [...newArray], //Needs fixing
        dataLoaded: true,
    })
}

// (ii)
// Request 'All' games
// To start from top, use: startAt = "<space>"
export function request_all(startAt, size, stateFunction, stateInput) {
    state = stateInput;
    setState = stateFunction;

    var database;
    database = firebase.database().ref('/Game Collection/all');

    database = database.orderByKey().startAt(startAt).limitToFirst(size);

    database.once('value').then(receive_data_all);      // Callback at (i)
}

export function search(keyword, size, stateFunction, stateInput) {
    state = stateInput;
    setState = stateFunction;

    keyword = keyword.toLowerCase();
    var database;
    database = firebase.database().ref('/Game Collection/search index');

    database = database.orderByValue().startAt(keyword).limitToFirst(size);

    database.once('value').then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            var gameId = childSnapshot.key;

            //Start at 'gameId', stop at size 1
            request_all(gameId, 1, setState, state,);         // Using function (ii)
        });
    });
}

export function request_category(category, startAt, size, stateFunction, stateInput) {
    category = category.toLowerCase();

    state = stateInput;
    setState = stateFunction;

    var database;
    database = firebase.database().ref('/Game Collection/' + category);

    database = database.orderByKey().startAt(startAt).limitToFirst(size);

    database.once('value').then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            var gameId = childSnapshot.key;
            console.log(gameId);
            //Start at 'gameId', stop at size 1
            request_all(gameId, size, setState, state);          // Using function (ii)
        });
    });
}


export function request_discover_cards(stateFunction, stateInput) {
    state = stateInput;
    setState = stateFunction;

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
        setState({
            ...state,
            discoverList: [...newArray],
            dataLoaded: true
        })
    });
}

export function request_included_category_list(stateFunction) {
    state = stateFunction;

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

