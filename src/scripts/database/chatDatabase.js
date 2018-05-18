const $ = require('jquery');

const chatDatabase = Object.create(null, {
    loadAll: {
        value: function () {
            const chatManager = require('../interface/chatManager')
            return $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/chat.json?print=pretty',
                type: 'GET',
            })
            .catch(e => console.log(e.message))
        }
    },
    createChat: {
        value: function (message) {
            $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/chat.json',
                method: 'POST',
                data: JSON.stringify(message)
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
