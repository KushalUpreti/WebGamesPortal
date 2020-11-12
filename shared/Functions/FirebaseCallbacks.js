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