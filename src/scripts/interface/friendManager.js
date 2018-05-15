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
            const $friendList = friendManager.friendListStructure();
            const $friendMessages = friendManager.friendMessages();

            // Appends everything to section
            $structure.append($friendList, $friendMessages);
            $printArea.append($structure);
        }
    },
    friendListStructure: {
        value: function () {
            const $friendList = $('<span>');
            $friendList.addClass('friends__list');

            return $friendList;
        }
    },
    getListOfFriends: {
        value: function (friends) {
            // Function requirements
            const getCurrentUser = require('../users/getCurrentUser').getCurrentUser;
            const userDatabase = require('../database/userDatabase');
            const user = getCurrentUser();

            // Filters friendships based on active user
            const friendShips = [];
            for (let key in friends) {
                if (friends[key].user1 === user.uid || friends[key].user2 === user.uid) {
                    friendShips.push(friends[key])
                }
            }

            const friendIds = [];
            friendShips.forEach(friend => {
                if (friend.user1 === user.uid) {
                    delete friend.user1;
                    friendIds.push(friend.user2);
                }
                if (friend.user2 === user.uid) {
                    delete friend.user2;
                    friendIds.push(friend.user1);
                }
            })

            const friendList = []
            const allUsers = [];
            $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/users.json?print=pretty',
                type: 'GET'
            }).then(users => {
                const userList = Object.keys(users)
                userList.forEach(key => {
                    let indivChannel = {
                        id: users[key].id,
                        name: users[key].name,
                        email: users[key].email
                    }
                    allUsers.push(indivChannel)
                })
                allUsers.forEach(friend => {
                    friendIds.forEach(id => {
                        if (id === friend.id) {
                            friendList.push(friend)
                        }
                    })
                })
            })


            console.log(friendList)
            friendManager.displayFriends(friendList)
        }
    },
    displayFriends: {
        value: function (friendList) {
            const $printArea = $('.friends__list');

            // Creates and prints friends to the friends list
            friendList.forEach(friend => {
                const $structure = $('<span>')
                    .addClass('friends__list--friendRow');

                const $name = $('<p>')
                    .addClass('friends__list--friendName')
                    .text(friend);

                const $count = $('<p>')
                    .addClass('friends__list--friendMessages')
                    .text(Math.floor(Math.random() * 10))
                // TODO - Hook up counter of all messages

                $structure.append($name, $count);
                $printArea.append($structure);
            })
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