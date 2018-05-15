const $ = require('jquery');
const modalFactory = require('../factories/modalFactory');
const headerManager = require('../interface/headerManager');
const buttonFactory = require('../factories/buttonFactory');
const friendDatabase = require('../database/friendDatabase');
const taskDatabase = require('../database/taskDatabase');
const getCurrentUser = require('../users/getCurrentUser').getCurrentUser;

// Manages all modals used throughout the app
const modalManager = Object.create(null, {
    // Adding new friend
    mFriend: {
        value: function () {
            // Creating arguments for modalFactory;
            const title = 'Add new friend'
            const details = `Enter your friend's email to get connected, start chatting, and gain access to their articles and events.`;
            const inputs = ['Friend email']
            const button = buttonFactory('modal__content--button', 'Add friend', (function () {
                const friend = $('id__Friend').val()
                const currentUser = 
                friendDatabase.createFriend()

            }))
            const modal = modalFactory(title, details, inputs, button);

            headerManager.closeDropdown();
        }
    },
    // Adding new task
    mTask: {
        value: function () {
            // Creating arguments for modalFactory;
            const title = 'Add new task'
            const details = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.';
            const inputs = ['Task name', 'Task description', 'Due date']
            const button = buttonFactory('modal__content--button', 'Add task', (function () {
                taskDatabase.createTask()
            }))
            const modal = modalFactory(title, details, inputs, button);

            headerManager.closeDropdown();
        }
    },
    // Adding new event
    mEvent: {
        value: function () {
            // Creating arguments for modalFactory;
            const title = 'Add new event'
            const details = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.';
            const inputs = ['Event name', 'Event date', 'Location']
            const button = buttonFactory('modal__content--button', 'Add event', (function () {
                eventDatabase.createEvent()
            }))
            const modal = modalFactory(title, details, inputs, button);

            headerManager.closeDropdown();
    }
},
    // Adding new article
    mArticle: {
        value: function () {
            // Creating arguments for modalFactory;
            const title = 'Add new task'
            const details = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.';
            const inputs = ['Article name', 'Summary', 'URL']
            const button = buttonFactory('modal__content--button', 'Add task', (function () {
                articleDatabase.createArticle()
            }))
            const modal = modalFactory(title, details, inputs, button);

            headerManager.closeDropdown();
        }
    },

})

module.exports = modalManager;