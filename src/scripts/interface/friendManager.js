const $ = require('jquery');
const $printArea = $('#data');
const friendDatabase = require('../database/friendDatabase');
const getCurrentUser = require('../users/getCurrentUser').getCurrentUser;

// Manages the friend view
const friendManager = Object.create(null, {
    friendBlock: {
        value: function () {
            const $structure = $('<span>');
            $structure.addClass('friends');

            // Gets list of friends & messages
            const $friendList = friendManager.friendListStructure();
            const $friendMessages = friendManager.friendMessages();

            const $header = friendManager.friendListHeader()

            console.log($header);
            
            $friendList.append($header);
            
            console.log($friendList)

            // Appends everything to section
            $structure.append($friendList, $friendMessages);
            $printArea.append($structure);
        }
    },
    friendListStructure: {
        value: function () {
            
            const $friendList = $('<div>')
                .addClass('friends__list')
                .attr('id', 'friendList');

            return $friendList;
        }
    },
    friendListHeader: {
        value: function () {
            const $header = $('<div>')
                .addClass('friends__list--header')
                .attr('id', 'friendHeader');

            return $header;
        }
    },
    getListOfFriends: {
        value: function (friends) {
            // Function requirements
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
                    friendIds.push(friend.user2);
                }
                if (friend.user2 === user.uid) {
                    friendIds.push(friend.user1);
                }
            })

            const friendList = []
            $.ajax({
                url: 'https://nutshell-kd.firebaseio.com/users.json?print=pretty',
                type: 'GET'
            }).then(users => {
                const allFriends = Object.keys(users)
                    .map(i => users[i])
                    .forEach(friend => {
                        friendIds.forEach(id => {
                            if (friend.id === id) {
                                friendList.push(friend)
                            }
                        })
                    })
                friendManager.displayFriends(friendList)
            })
        }
    },
    displayFriends: {
        value: function (friendList) {
            const chatManager = require('./chatManager');
            const $printArea = $('.friends__list');
            // Creates and prints friends to the friends list
            friendList.forEach(friend => {
                const $structure = $('<span>')
                    .addClass('friends__list--friendRow')
                    .attr('id', friend.id)
                    .on('click', function (e) {
                        chatManager.activeChat(e)
                    });

                const nameArray = friend.name.split(' ');
                const initials = `${nameArray[0].charAt(0)}${nameArray[1].charAt(0)}`

                const $profile = $('<span>')
                    .addClass('friends__list--profile')
                    .text(initials);

                const $name = $('<p>')
                    .addClass('friends__list--friendName')
                    .text(friend.name);

                const $count = $('<p>')
                    .addClass('friends__list--notification')
                    .attr('id', `count__${friend.id}`)
                // TODO - Hook up counter of all messages

                $structure.append($profile, $name);
                $printArea.append($structure);
                friendManager.countFriends(friendList.length)


            })
            // Loads active chat
            chatManager.activeChat();
        }
    },
    countFriends: {
        value: function (count) {
            $('#friendCount')
                .html(`(${count} total)`);
        }
    },
    friendMessages: {
        value: function () {
            const $friendMessages = $('<span>')
                .addClass('friends__messages');

            const writeMessages = friendManager.writeMessages();
            const showMessages = friendManager.showMessages();

            // Appending to the message block
            $friendMessages.append(showMessages, writeMessages);
            return $friendMessages;
        }
    },
    showMessages: {
        value: function () {
            // Creates area where messages are printed
            const $postMessages = $('<span>');
            $postMessages.addClass('friends__messages--post');
            return $postMessages;
        }
    },
    writeMessages: {
        value: function () {
            const chatManager = require('./chatManager');
            const $writeArea = $('<span>')
                .addClass('friends__messages--container');

            // Creates area where messages are written
            const $write = $('<input>')
                .attr('placeholder', 'Enter message')
                .addClass('friends__messages--write')
                .keypress(function (e) {
                if ($write.val()) {
                    if (e.which === 13) {
                        chatManager.createMessage($write.val());
                        friendManager.clearWriteArea();
                        friendManager.scrollToBottom();
                    }
                }
            })
            const $emoji = $('<img>')
                .attr('src', 'img/emoji.svg')
                .addClass('friends__messages--emoji')
                .mouseenter(function() {
                    $('.friends__messages--emoji').attr('src', 'img/emojidark.svg')
                })
                .mouseleave(function() {
                    $('.friends__messages--emoji').attr('src', 'img/emoji.svg')
                });
            
            $writeArea.append($write, $emoji)
            return $writeArea;
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