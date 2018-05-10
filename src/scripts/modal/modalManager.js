const $ = require('jquery');
const dropdownFactory = require('../factories/modalFactory');

// Manages all modals used throughout the app
const modalManager = Object.create(null, {
    // Adding new friend
    mFriend: {
        value: function () {
            console.log('friend')
            
        }
    },
    // Adding new task
    mTask: {
        value: function () {
            console.log('task')
            
        }
    },
    // Adding new event
    mEvent: {
        value: function () {
            console.log('event')
            
        }
    },
    // Adding new article
    mArticle: {
        value: function () {
            console.log('article')

        }
    },

})

module.exports = modalManager;