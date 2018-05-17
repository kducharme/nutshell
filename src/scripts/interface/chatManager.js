const $ = require('jquery');
const $printArea = $('#data');
const getCurrentUser = require('../users/getCurrentUser').getCurrentUser;
const chatDatabase = require('../database/chatDatabase');

let currentChat = null;

// Manages the friend view
const chatManager = Object.create(null, {
    activeChat: {
        value: function (e) {
            let $activeChat = $('#friendList')[0].childNodes[0];
            let $activeChatName = $('#friendList')[0].childNodes[0].childNodes[1];
            let $activeChatProfile = $('#friendList')[0].childNodes[0].childNodes[0];

            if (e) {
                $activeChat = e.currentTarget;
                $activeChatName = $activeChat.childNodes[1];
                $activeChatProfile = $activeChat.childNodes[0];
            }

            chatManager.setCurrentChat($activeChat.id)

            $('.friends__list--friendRow').removeClass('activeChat');
            $('.friends__list--friendName').removeClass('activeChat__name');
            $('.friends__list--profile').removeClass('activeChat__profile');
            $activeChat.classList.add('activeChat');
            $activeChatName.classList.add('activeChat__name');
            $activeChatProfile.classList.add('activeChat__profile');
        }
    },
    getCurrentChat: {
        value: function () {
            return currentChat;
        }
    },
    setCurrentChat: {
        value: function (user) {
            currentChat = user;
        }
    },
    changeChat: {
        value: function (e) {
            // Clears chat area
            $('.friends__messages--post').empty()
        }
    },
    createMessage: {
        value: function (text) {
            const sender = getCurrentUser();
            const receiver = chatManager.getCurrentChat();

            const message = {
                sender: sender.uid,
                receiver,
                text
            }
        chatManager.postNewMessage(message)
        chatManager.saveMessage(message)
        }
    },
    postNewMessage: {
        value: function (message) {
            const currentUser = getCurrentUser().uid;
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
        }
    },
    saveMessage: {
        value: function (message) {
            console.log(message)
            chatDatabase.createChat(message)
        }
    },
    loadMessages: {
        
    }
})

module.exports = chatManager;