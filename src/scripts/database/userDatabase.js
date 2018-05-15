const $ = require('jquery');

const userDatabase = Object.create(null, {
    getAllUsers: {
        value: function () {
            return $.ajax('https://nutshell-kd.firebaseio.com/users.json?print=pretty')
        }
    },
    getSingleUser: {
        value: function () {
            return $.ajax(`https://nutshell-kd.firebaseio.com/Users/${key}.json?print=pretty`)
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