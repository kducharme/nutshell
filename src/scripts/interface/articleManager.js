const $ = require('jquery');
const $printArea = $('#data');

// Manages the friend view
const articleManager = Object.create(null, {
    articleBlock: {
        value: function () {
            const $structure = $('<span>')
                .addClass('articles');

            // Appends everything to section
            $printArea.append($structure);
        }
    }
})

module.exports = articleManager;