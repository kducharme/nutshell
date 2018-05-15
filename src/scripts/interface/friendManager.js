const $ = require('jquery');
const $printArea = $('#data');
const friendDatabase = require('../database/friendDatabase')

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
    displayFriends: {
        value: function (friends) {
            const allGlobalFriends = []
            for (let key in friends) {
                allGlobalFriends.push(friends[key])
            }
            
            const $printArea = $('.friends__list');
            const getCurrentUser = require('../users/getCurrentUser').getCurrentUser;
            const user = getCurrentUser();

            console.log(allGlobalFriends.length)
            console.log(user);

            allGlobalFriends.forEach(friend => {
               console.log(friend.user1)
               console.log(friend.user2)
            })

            // const friendList = allGlobalFriends.filter(friend => {
            //     if (user1 === user || user2 === user)
            //         return true
            // })

            // console.log(allFriends)
            // console.log(friendList)
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
            $writeArea.keypress(function (e) {
                if ($writeArea.val()) {
                    if (e.which === 13) {
                        friendManager.postMessages($writeArea.val());
                        friendManager.clearWriteArea();
                        friendManager.scrollToBottom();
                    }
                }
            })
            return $writeArea;
        }
    },
    postMessages: {
        value: function ($text) {
            const $message = $('<span>');
            $message.addClass('message')
            $message.text($text);
            $('.friends__messages--post').append($message);

            // TODO - SEND NEW MESSAGE TO DB
            // TODO - GET USER NAME
            // TODO - GET DATE
            // TODO - ADD DELETE
            // TODO - ADD EDIT
        }
    },
    scrollToBottom: {
        value: function () {
            $('.friends__messages--post').scrollTop(9999);
        }
    },
    clearWriteArea: {
        value: function () {
            $('.friends__messages--write').val('');
        }
    }
})

module.exports = friendManager;