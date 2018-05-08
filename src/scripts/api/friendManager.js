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

Friends
- Add friend
- Load friend
- Delete friend
- Update friend

Events
- Add event
- Load event
- Delete event
- Update event

Articles
- Add article
- Load article
- Delete article
- Update article

Tasks
- Add task
- Load task
- Delete task
- Update task

Chat
- Add task
- Load task
- Delete task
- Update task

*/