const $ = require('jquery');

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

