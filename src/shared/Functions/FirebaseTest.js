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
        localStorage.setItem("userCred", JSON.stringify(res.user));
        signInFunction();

    }).catch((error) => {
        console.log(error.message)
    })
}
// (i)
// Request 'All' games
// To start from top, use: startAt = "<space>"
export function request_all(startAt, size, callback) {

    var database;
    database = firebase.database().ref('/Game Collection/all');

    database = database.orderByKey().startAt(startAt).limitToFirst(size);

    database.once('value').then(callback);
}


// (ii)
//Requesting games from category is 2 step process:
//                          1) Get 'gameId's included in the category
//                          2) Request the 'gameId' key from 'All' game list
export function request_category(category, startAt, size, callback) {
    category = category.toLowerCase();

    var database;
    database = firebase.database().ref('/Game Collection/' + category);

    database = database.orderByKey().startAt(startAt).limitToFirst(size);

    database.once('value').then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            var gameId = childSnapshot.key;

            //Start at 'gameId', stop at size 1
            request_all(gameId, 1, callback);          // Using function (i) & passing 'callback' parameter
        });
    });
}


// (iii)
//Search the database
export function search(keyword, size, callback) {
    keyword = keyword.toLowerCase();

    var database;
    database = firebase.database().ref('/Game Collection/search index');

    database = database.orderByValue().startAt(keyword).limitToFirst(size);

    database.once('value').then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {
            var gameId = childSnapshot.key;

            //Start at 'gameId', stop at size 1
            request_all(gameId, 1, callback);         // Using function (i) & passing 'callback' parameter
        });
    });
}

// (iv)
// Not all categories are shown in the UI. The database contains list of categories to be shown to users which are updated
// periodically .
export function request_included_category_list(callback) {
    var database;
    database = firebase.database().ref('/Game Collection/Categories Included');
    database.once('value').then(callback);
}

// (v)
// Discover Cards
export function request_discover_cards(callback) {
    var database;
    database = firebase.database().ref('/Discover Cards');

    database.once('value').then(callback);
}

// (vi)
// Avatar Url
export function get_avatar_url(UID, callback) {
    var database;
    database = firebase.database().ref('/Users/' + UID);

    database.once('value').then(function (snapshot) {
        var avatarId = snapshot.val().avatarId;
        firebase.database().ref('/Avatars/' + avatarId).once("value").then(callback);
    });
}

// (vii)
// Favorites
export function get_favorites(UID, callback) {
    var database;
    database = firebase.database().ref('/Users/' + UID + "/favorites");

    database.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var gameId = childSnapshot.key;

            //Start at 'gameId', stop at size 1
            request_all(gameId, 1, callback);          // Using function (i) & passing 'callback' parameter
        });
    });
}

// (viii)
// Add to Favorites
export function add_to_favorites(UID, gameId, callback) {
    var database;
    database = firebase.database().ref('/Users/' + UID + "/favorites/" + gameId);
    database.set(true, callback);       //Setting true to add
}

// (ix)
// Remove from favorites
export function remove_from_favorites(UID, gameId, callback) {
    var database;
    database = firebase.database().ref('/Users/' + UID + "/favorites/" + gameId);
    database.set(null, callback);       //Setting null to remove
}