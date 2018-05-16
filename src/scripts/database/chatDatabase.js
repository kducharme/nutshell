const $ = require('jquery');

const chatDatabase = Object.create(null, {
    loadAllFriends: {
        value: function () {
            const friendManager = require('../interface/friendManager')
            $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/friends.json?print=pretty',
                type: 'GET'
            })
            .then($('.friends__list').empty())
            .catch(e => console.log(e.message));
        }
    },
    createChat: {
        value: function (friendship) {
            $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/friends.json',
                method: 'POST',
                data: JSON.stringify(friendship)
            })
        }
    },
    updateChat: {
        value: function (friend) {
            $.ajax({
                url: `https://nutshell-kd.firebaseio.com/friends/${friend.key}`,
                method: 'PATCH'
            })
        }
    },
    deleteChat: {
        value: function (friend) {
            $.ajax({
                url: `https://nutshell-kd.firebaseio.com/friends/${friend.key}`,
                method: 'DELETE'
            })
        }
    }
})

module.exports = chatDatabase;
