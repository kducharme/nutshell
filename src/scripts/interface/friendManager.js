const $ = require('jquery');
const $printArea = $('#data');

// Manages the friend view
const friendManager = Object.create(null, {
    friendBlock: {
        value: function () {
            const $structure = $('<span>');
            $structure.addClass('friends');

            // Gets list of friends & messages
            const $friendList = friendManager.friendList();
            const $friendMessages = friendManager.friendMessages();

            // Appends everything to section
            $structure.append($friendList, $friendMessages);
            $printArea.append($structure);
        }
    },
    friendList: {
        value: function () {
            const $friendList = $('<span>');
            $friendList.addClass('friends__list');

            return $friendList;
        }
    },
    friendMessages: {
        value: function () {
            const $friendMessages = $('<span>');
            $friendMessages.addClass('friends__messages');
            const writeMessages = friendManager.writeMessages();
            const showMessages = friendManager.showMessages();

            // Appending to the message block
            $friendMessages.append(showMessages, writeMessages);

            return $friendMessages;
        }
    },
    showMessages: {
        value: function () {
            const $postMessages = $('<span>');
            $postMessages.addClass('friends__messages--post');

            return $postMessages;
        }
    },
    writeMessages: {
        value: function () {
            const $writeArea = $('<input>');
            $writeArea.attr('placeholder', 'Enter message');
            $writeArea.addClass('friends__messages--write');

            return $writeArea;
        }
    }
})

module.exports = friendManager;