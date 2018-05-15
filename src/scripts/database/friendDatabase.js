const $ = require('jquery');

const friendDatabase = Object.create(null, {
    getAllFriends: {
        value: function () {
            return $.ajax('https://nutshell-kd.firebaseio.com/friends.json?print=pretty')
        }
    },
    getSingleFriend: {
        value: function () {
            return $.ajax(`https://nutshell-kd.firebaseio.com/friends/${key}.json?print=pretty`)
        }
    },
    createFriend: {
        value: function (friend) {
            $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/friends.json',
                method: 'POST',
                data: JSON.stringify(friend)
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

module.exports = friendDatabase;

/*

Chat
- Add task
- Load task
- Delete task
- Update task

*/