var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Victor'
    };
    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(38, (user) => {
    console.log(user);
});