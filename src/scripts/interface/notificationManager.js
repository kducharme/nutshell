const $ = require('jquery');
const $printArea = $('#data');
const getCurrentUser = require('../users/getCurrentUser').getCurrentUser;
const friendManager = require('./friendManager');

// Manages the friend view
const notificationManager = Object.create(null, {
    checkForUpdates: {
        value: function () {
            let databaseRef = firebase.database().ref(`chat/`);
            databaseRef.on('value', snap => {
                const allChats = snap.val()
                const newMessage = Object.keys(allChats)
                    .map(i => allChats[i])
                    .pop();
                console.log(newMessage)
                notificationManager.postNewMessage(newMessage)
                notificationManager.notificationFilter(newMessage)
            })
        }
    },
    notificationFilter: {
        value: function (message) {
            // Filters the new messages by:
            // 1. Whether or not the two people are friends
            // 2. Whether or not the recipient is not currently chatting with the sender

            const activeChat = $('.activeChat')[0].id;
            const currentUser = getCurrentUser().uid;
            const activeUserFriendList = Array.from($('.friends__list')[0].childNodes);

            // Checks whether or not new messages are sent in the current chat or another chat
            if ((message.receiver === activeChat && message.sender === currentUser) || (message.receiver === currentUser && message.sender === activeChat)) {
                console.log('this chat')
            }
            else {
                // If sent in another chat, it checks whether or not it was sent by a friend
                let sender;
                activeUserFriendList.forEach(friend => {
                    if (message.receiver === currentUser) {
                        if (message.sender !== activeChat) {
                            sender = message.sender;
                        }
                    }
                    else {
                        console.log('not my friend :(');
                    }
                })
                notificationManager.showNotification(sender);
            }
        }
    },
    showNotification: {
        value: function (sender) {
            // Posts notification if a new message is sent by a friend that the user is not currently speaking with
            if (sender) {
                const $sender = $(`#${sender}`)
                const $printArea = $sender[0];
                const notify = document.createElement('span')
                notify.classList.add('notification');
                $printArea.append(notify);
            }
        }
    },
    removeNotification: {
        value: function ($channel) {
            // Removes notification when the channel is clicked
            if ($channel.childNodes.length === 3) {
                $channel.childNodes[2].remove();
            }
            // $($channel).remove($('.notification'));
        }
    },
    postNewMessage: {
        value: function (message) {
            const currentUser = getCurrentUser().uid;
            const activeChat = $('.activeChat')[0].id;

            if (message.sender === activeChat && message.receiver === currentUser && message.sender !== currentUser) {
                const $structure = $('<span>')
                    .addClass('message');
                const $message = $('<p>')
                    .text(message.text)
                    .addClass('message__text');

                if (currentUser === message.sender) {
                    $structure.addClass('message__text--sender');
                    $message.addClass('message__textSender');
                }
                if (currentUser !== message.sender) {
                    $structure.addClass('message__text--receiver');
                }

                $structure.append($message)
                $('.friends__messages--post').append($structure);

                friendManager.scrollToBottom();
            }
            else {
            }

        }
    }
})

notificationManager.checkForUpdates();

module.exports = notificationManager;