export const receive_data_all = (snapshot) => {
    let newArray = [];
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
    return newArray;
}

export const discoverCardCallback = (snapshot) => {

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
    return newArray;
}

export const categoryListCallback = (snapshot) => {
    let newArray = [];
    // List with inluded categories: snapshot

    // Get values like
    snapshot.forEach(function (childSnapshot) {
        var category = childSnapshot.val();
        newArray.push(category);
    });
    return newArray;
}

export const searchCallback = (snapshot) => {
    const array = [];
    snapshot.forEach(function (childSnapshot) {
        var gameId = childSnapshot.key;
        var name = (childSnapshot.val().name);
        var url = (childSnapshot.val().url);
        var imageUrl = (childSnapshot.val().imageUrl);
        var category = (childSnapshot.val().category);

        const value = {
            gameId,
            name,
            url,
            imageUrl,
            category
        }
        array.push(value);
    });
    return array;
};

export const request_gameCallback = (snapshot) => {
    console.log("Received Data:");
    var gameId = snapshot.key;
    var name = (snapshot.val().name);
    var url = (snapshot.val().url);
    var imageUrl = (snapshot.val().imageUrl);
    var category = (snapshot.val().category);

    // var isPortrait=(childSnapshot.val().isPortrait);  Note: 'Not For Web'

    const object = {
        gameId,
        name,
        url,
        imageUrl,
        category
    }
    return object;
}

export const all_avatarCallback = (childSnapshot) => {
    var avatarId = childSnapshot.key;          // avatar key (usually numeric sequence starting from '1')
    var avatarUrl = childSnapshot.val()

    const obj = {
        avatarId,
        avatarUrl
    }
    return obj;
}

export const game_teaserCallback = (snapshot) => {
    // Get values like
    const array = [];
    snapshot.forEach(function (childSnapshot) {
        var gameId = childSnapshot.val().gameId;      // Game ID of the game
        var imageUrl = childSnapshot.val().imageUrl;     // Image Url
        var category = childSnapshot.val().category;

        const obj = {
            gameId,
            imageUrl,
            category
        }
        array.push(obj);
    });
    return array;
};
