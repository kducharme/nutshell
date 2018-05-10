const $ = require('jquery');

// Manages the friend view
const friendManager = Object.create(null, {
    friendBlock: {
        value: function () {
            const $structure = $('span');
            $structure.addClass('friends');
            
            // Gets list of friends & messages
            const $friendList = friendManager.friendList();
            const $friendMessages = friendManager.friendMessages();

            // Appends everything to section
            $structure.append($friendList, $friendMessages);
        }
    },
    friendList: {
        value: function () {
            const $structure = $('span');
            $structure.addClass('friends__list');

            return $structure;
        }
    },
    friendMessages: {
        value: function () {
            const $structure = $('span');
            $structure.addClass('friends__messages');
            
            return $structure;
        }
    },
    showMessages: {
        value: function () {
        }
    },
    writeMessage: {
        value: function () {
        }
    },
})

module.exports = friendManager;