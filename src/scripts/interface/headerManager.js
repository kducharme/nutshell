const $ = require('jquery');
const $printArea = $('.nav__left');
const buttonFactory = require('../factories/buttonFactory');
const modalManager = require('../modal/modalManager');

const headerManager = Object.create(null, {
    createStructure: {
        value: function () {
            // Creates the header structure
            // Gets data 
            const $header = headerManager.addHeader();
            const $button = headerManager.addButton();

            // Appends components to the header
            $printArea.append($header, $button)
        }
    },
    addHeader: {
        // Adds header text to left nav
        value: function () {
            const $structure = $('<span>')
                .addClass('nav__left--structure')

            const $text = $('<p>')
                .text('Friends')
                .addClass('nav__left--text');

            const $count = $('<p>')
                .attr('id', 'friendCount')
                .addClass('nav__left--count');

            $structure.append($text, $count);

            return $structure;
        }
    },
    addButton: {
        value: function () {
            // Creating a button via buttonFactory
            const button = buttonFactory('nav__left--button', 'Add new', (function() {
                modalManager.mFriend();
            }))

            return button;
        }
    },
    createDropdown: {
        value: function () {
            const dropdownFactory = require('../factories/dropdownFactory');
            const modalManager = require('../modal/modalManager');
            const $body = $('body')

            // Requirements for dropdownFactory
            const options = ['Friend', 'Event', 'Article', 'Task']
            const optionEvent = 'modal';
            const button = $('.header__button');
            const event = (function () {
                headerManager.closeDropdown();
            })

            // Calling factory and passing arguments
            const dropdown = dropdownFactory(button, options, event, 15, -5, optionEvent);

            // Appends dropdown to the body
            $body.append(dropdown)
        }
    },
    closeDropdown: {
        value: function () {
            $('.dropdown__background').remove();
            $('.dropdown').remove();
        }
    }
})

module.exports = headerManager;

