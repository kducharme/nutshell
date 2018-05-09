const $ = require('jquery');

const friendManager = Object.create(null, {
    getFriend: {
        value: function () {
            return $.ajax('https://nutshell-kd.firebaseio.com/friends.json?print=pretty')
        }
    },
    createFriend: {
        value: function () {
            $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/friends/',
                method: 'POST'
            })
        }
    },
    updateFriend: {
        value: function (friend) {
            $.ajax({
                url: `https://nutshell-kd.firebaseio.com/friends/${friend.key}`,
                method: 'PATCH'
            })
        }
    },
    deleteFriend: {
        value: function (friend) {
            $.ajax({
                url: `https://nutshell-kd.firebaseio.com/friends/${friend.key}`,
                method: 'DELETE'
            })
        }
    }
})

module.exports = friendManager;

/*

Chat
- Add task
- Load task
- Delete task
- Update task

*/