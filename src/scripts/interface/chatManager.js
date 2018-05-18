const $ = require('jquery');
const $printArea = $('#data');
const getCurrentUser = require('../users/getCurrentUser').getCurrentUser;
const chatDatabase = require('../database/chatDatabase');
const friendManager = require('./friendManager');
const notificationManager = require('./notificationManager');

let currentChat = null;

// Manages the friend view
const chatManager = Object.create(null, {
    activeChat: {
        value: function (e) {
            // Sets the default chat to the first on the list
            let $activeChat = $('#friendList')[0].childNodes[0];
            let $activeChatName = $('#friendList')[0].childNodes[0].childNodes[1];
            let $activeChatProfile = $('#friendList')[0].childNodes[0].childNodes[0];

            // Changes active chat based on what user clicks
            if (e) {
                $activeChat = e.currentTarget;
                $activeChatName = $activeChat.childNodes[1];
                $activeChatProfile = $activeChat.childNodes[0];
            }

            // Sets the active chat to retrieve later if needed
            chatManager.setCurrentChat($activeChat.id)

            // Adds styling to friend list based on active chat
            $('.friends__list--friendRow').removeClass('activeChat');
            $('.friends__list--friendName').removeClass('activeChat__name');
            $('.friends__list--profile').removeClass('activeChat__profile');
            $activeChat.classList.add('activeChat');
            $activeChatName.classList.add('activeChat__name');
            $activeChatProfile.classList.add('activeChat__profile');

            // Empties the DOM and loads messages
            $('.friends__messages--post').empty()
            chatManager.loadMessages($activeChat);
            notificationManager.removeNotification($activeChat);
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
            chatDatabase.createChat(message)
        }
    },
    loadMessages: {
        value: function (activeChat) {
            const currentUser = getCurrentUser().uid;
            let chatMessages = [];
            chatDatabase.loadAll().then(chats => {
                const allChats = Object.keys(chats)
                    .map(i => chats[i])
                    .forEach(chat => {
                        if ((chat.sender === activeChat.id || chat.receiver === activeChat.id) && (currentUser === chat.sender || currentUser === chat.receiver)) {
                            chatMessages.push(chat);
                        }
                    })
                chatManager.postSavedMessages(chatMessages);
            });
        }

    },
    postSavedMessages: {
        value: function (chatMessages) {
            const currentUser = getCurrentUser().uid;

            chatMessages.forEach(message => {
                // Creates element for message block
                const $structure = $('<span>')
                    .addClass('message');

                // Creates element for message text
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
            })
        }
    },
})

module.exports = chatManager;