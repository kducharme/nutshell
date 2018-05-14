const $ = require('jquery');

const friendDatabase = Object.create(null, {
    getFriend: {
        value: function () {
            return $.ajax('https://nutshell-kd.firebaseio.com/friends.json?print=pretty')
        }
    },
    createFriend: {
        value: function () {
            console.log('woo woo - friend added')
            // $.ajax({
            //     url: 'https://nutshell-kd.firebaseio.com/friends/',
            //     method: 'POST'
            // })
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