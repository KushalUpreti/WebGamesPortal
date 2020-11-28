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
export const signInWithGoogle = (signInFunction, history) => {
    auth.signInWithPopup(googleProvider).then((res) => {

        localStorage.setItem("userCred", JSON.stringify(res.user));
        history.go(0);
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
            request_game(gameId, callback);         // Using function (i) & passing 'callback' parameter
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

// (ix)
// Check if Favorite
export function check_if_favorite(UID, gameId, callback) {
    var database;
    database = firebase.database().ref('/Users/' + UID + "/favorites/" + gameId);
    database.once('value').then(callback);       //Query to know if game exists
}

function request_game(gameId, callback) {
    var database;
    database = firebase.database().ref('/Game Collection/all/' + gameId);
    database.once('value').then(callback);
}

export function get_history(UID, callback) {
    var database;
    database = firebase.database().ref('/Users/' + UID + "/history");

    database.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var gameId = childSnapshot.key;

            //Start at 'gameId', stop at size 1
            request_game(gameId, callback);          // Using function (i) & passing 'callback' parameter
        });
    });
}

// (x)
// Add to history 
export function add_to_history(UID, gameId, callback) {
    var database;
    database = firebase.database().ref('/Users/' + UID + "/history/" + gameId);
    database.set(true, callback);       //Setting true to add
}

// (xi)
// Check if Favorite
export function check_if_history(UID, gameId, callback) {
    var database;
    database = firebase.database().ref('/Users/' + UID + "/history/" + gameId);
    database.once('value').then(callback);       //Query to know if game exists
}

// (xii)
// Remove from favorites
export function remove_from_history(UID, gameId, callback) {
    var database;
    database = firebase.database().ref('/Users/' + UID + "/history/" + gameId);
    database.set(null, callback);       //Setting null to remove
}

export function clear_favorites(UID) {
    var database;
    database = firebase.database().ref('/Users/' + UID + "/favorites/");
    return database.remove();
}

//Remove all history.
export function clear_history(UID) {
    var database;
    database = firebase.database().ref('/Users/' + UID + "/history/");
    database.remove();
}


// (vii)
// Change Avatar
export function change_avatar(UID, avatarId, errorCallback) {
    var database;
    database = firebase.database().ref('/Users/' + UID + '/avatarId').set(avatarId, errorCallback);
}

// (viii)
// Get list of avatars
export function get_avatar_list(callback) {
    var database;
    database = firebase.database().ref('/Avatars');
    database.once('value').then(callback);
}

// (vi)
// Avatar Url
export function get_avatar_url(UID, callback) {
    var database;
    database = firebase.database().ref('/Users/' + UID);

    database.once('value').then(function (snapshot) {
        var avatarId;
        if (snapshot.val() === null) {
            avatarId = 4;
        } else {
            avatarId = snapshot.val().avatarId;
        }

        firebase.database().ref('/Avatars/' + avatarId).once("value").then(callback);
    });
}

export function get_background_url(UID, callback) {
    var database;
    database = firebase.database().ref('/Users/' + UID);

    database.once('value').then(function (snapshot) {
        var backgroundImageId = snapshot.val().backgroundImageId;
        if (backgroundImageId === undefined) {
            backgroundImageId = 8;
        }
        firebase.database().ref('/Background Images/' + backgroundImageId).once("value").then(callback);
    });
}

// (x)
// Change Background
export function change_background(UID, avatarId, errorCallback) {
    var database;
    database = firebase.database().ref('/Users/' + UID + '/backgroundImageId').set(avatarId, errorCallback);
}

// (xi)
// Get list of background images
export function get_background_list(callback) {
    var database;
    database = firebase.database().ref('/Background Images/');
    database.once('value').then(callback);
}

export function get_game_teasers(callback) {
    var database;
    database = firebase.database().ref('Game Teasers/');
    database.once('value').then(callback);       //Query the list of teasers
}


