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
            })
        }
    },
    postNewMessage: {
        value: function (message) {
            const currentUser = getCurrentUser().uid;
            const activeChat = $('.activeChat')[0].id;

            if ((message.sender === activeChat || message.receiver === activeChat) && (message.sender !== currentUser)) {
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


        }
    }
})

notificationManager.checkForUpdates();

module.exports = notificationManager;