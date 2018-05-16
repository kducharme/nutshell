const $ = require('jquery');
const $printArea = $('#data');
const buttonFactory = require('../factories/buttonFactory');

const headerManager = Object.create(null, {
    createStructure: {
        value: function () {
            // Creates the header structure
            const $structure = $('<span>')
                .addClass('header');

            // Gets data 
            const $button = headerManager.addButton();
            const $tabs = headerManager.addTabs();

            // Appends components to the header
            $structure.append($tabs, $button)
            $printArea.append($structure);
        }
    },
    addTabs: {
        value: function () {
            // Creates the container for the tabs
            $structure = $('<span>')
                .addClass('header__tabList');

            const tabs = ['Friends', 'Events']

            // Adds the tab content to the container
            tabs.forEach(tab => {
                const $block = $('<span>')
                    .addClass('header__tabList--block')
                    .attr('id', tab)
                    .on('click', function (e) {
                        headerManager.navigateTabs(e)
                        headerManager.showContent(e);
                    })
                // Creates name of tab
                const $tabName = $('<p>')
                    .addClass('header__tabList--label')
                    .text(tab);

                // Counts total activity within tab
                const $counter = $('<p>')
                    .addClass(`header__tabList--counter`)
                    .attr('id', `id__${tab}`);

                // Appends everything to the block
                $block.append($tabName, $counter)
                $structure.append($block)
            })
            return $structure;
        }
    },
    navigateTabs: {
        value: function (e) {
            // Selecting the default active tab (friends)
            let $activeTab = $('#Friends');
            let $activeLabel = $('#Friends')[0].childNodes[0];
            let $activeCounter = $('#Friends')[0].childNodes[1];

            // If a tab has been clicked, it toggles active tab
            if (e) {
                $activeTab = e.currentTarget;
                $activeLabel = $activeTab.childNodes[0];
                $activeCounter = $activeTab.childNodes[1];
            }

            // Adds styling to the active tab
            $('.header__tabList--label').removeClass('activeTab');
            $('.header__tabList--counter').removeClass('activeCounter');
            $activeLabel.classList.add('activeTab');
            $activeCounter.classList.add('activeCounter');
        }
    },
    showContent: {
        value: function (e) {
            const taskManager = require('./taskManager');
            const articleManager = require('./articleManager');
            const eventManager = require('./eventManager');
            let activeContent = 'Friends';
            if (e) {
                activeContent = e.currentTarget.id;
            }
            switch (activeContent) {
                case 'Friends':
                    $('.friends').show();
                    $('.tasks, .events, .articles').hide();
                    break;
                case 'Tasks':
                    $('.tasks').remove();
                    taskManager.taskBlock();
                    $('.friends, .events, .articles').hide();
                    break;
                case 'Events':
                    $('.events').remove();
                    eventManager.eventBlock();
                    $('.friends, .tasks, .articles').hide();
                    break;
                case 'Articles':
                    $('.articles').remove();
                    articleManager.articleBlock();
                    $('.friends, .events, .tasks').hide();
                    break;
            }
        }
    },
    countTabs: {
        // TODO -- HOOK UP FILTER COUNTERS
        value: function () {
            const count = Math.floor(Math.random() * 10);
            return count;
        }
    },
    addButton: {
        value: function () {
            // Creating a button via buttonFactory
            const button = buttonFactory('header__button', 'Add new', headerManager.createDropdown)
            button.innerHTML += `<img src='img/arrow-down.svg'>`;
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

