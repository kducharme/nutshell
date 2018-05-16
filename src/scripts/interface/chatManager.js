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
            let $activeChatName = $('#friendList')[0].childNodes[0].childNodes[0];
            let $activeChatCount = $('#friendList')[0].childNodes[0].childNodes[1];

            if (e) {
                $activeChat = e.currentTarget;
                $activeChatName = $activeChat.childNodes[0];
                $activeChatCount = $activeChat.childNodes[1];
            }

            chatManager.setCurrentChat($activeChat.id)

            $('.friends__list--friendRow').removeClass('activeChat');
            $('.friends__list--friendName').removeClass('activeChat__name');
            $('.friends__list--friendMessages').removeClass('activeChat__count');
            $activeChat.classList.add('activeChat');
            $activeChatName.classList.add('activeChat__name');
            $activeChatCount.classList.add('activeChat__count');
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
    postMessage: {
        value: function ($text) {
            const sender = getCurrentUser();
            const receiver = chatManager.getCurrentChat();

            const chat = {
                sender: sender.uid,
                receiver,
                $text
            }

            console.log($text.length)

            const $structure = $('<span>')
                .addClass('message');

            const $message = $('<p>')
                .addClass('message__text')
                .text($text);

            const $author = $('<p>')
                .addClass('message__author')
                .text(sender.email);

            $structure.append($author, $message)

            $('.friends__messages--post').append($structure);

            // TODO - SEND NEW MESSAGE TO DB
            // TODO - GET USER NAME
            // TODO - GET DATE
            // TODO - ADD DELETE
            // TODO - ADD EDIT
        }
    }
})

module.exports = chatManager;