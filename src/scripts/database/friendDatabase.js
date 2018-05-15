const $ = require('jquery');

const friendDatabase = Object.create(null, {
    loadAllFriends: {
        value: function () {
            const friendManager = require('../interface/friendManager')
            $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/friends.json?print=pretty',
                type: 'GET'
            })
            .then(friends => {
                friendManager.displayFriends(friends)
            })
            .catch(e => console.log(e.message));
        }
    },
    getSingleFriend: {
        value: function () {
            return $.ajax(`https://nutshell-kd.firebaseio.com/friends/${key}.json?print=pretty`)
        }
    },
    createFriend: {
        value: function (friendship) {
            $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/friends.json',
                method: 'POST',
                data: JSON.stringify(friendship)
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