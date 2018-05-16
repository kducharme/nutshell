const $ = require('jquery');

// Gets all users from firebase and converts to array
const userManager = Object.create(null, {
    getAllUsers: {
        value: function (users) {
            const allUsers = []
            for (let key in users) {
                allUsers.push(users[key])
            }
            return allUsers;
        }
    },


})

module.exports = userManager;

