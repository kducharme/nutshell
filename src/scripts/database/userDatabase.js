const $ = require('jquery');

const userDatabase = Object.create(null, {
    loadAllUsers: {
        value: function () {
            const userManager = require('../users/userManager')
            $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/users.json?print=pretty',
                type: 'GET'
            })
            .then(users => {
                userManager.getAllUsers(users)
            })
            .catch(e => console.log(e.message));
        }
    },
    getSingleUser: {
        value: function (id) {
            return $.ajax(`https://nutshell-kd.firebaseio.com/Users/${id}.json?print=pretty`)
        }
    },
    createUser: {
        value: function (user) {
            $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/users.json',
                method: 'POST',
                data: JSON.stringify(user)
            })
        }
    },
    updateUser: {
        value: function (user) {
            $.ajax({
                url: `https://nutshell-kd.firebaseio.com/Users/${user.key}`,
                method: 'PATCH'
            })
        }
    },
    deleteUser: {
        value: function (user) {
            $.ajax({
                url: `https://nutshell-kd.firebaseio.com/Users/${user.key}`,
                method: 'DELETE'
            })
        }
    }
})

module.exports = userDatabase;