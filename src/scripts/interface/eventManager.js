const $ = require('jquery');
const $printArea = $('#data');

// Manages the friend view
const eventManager = Object.create(null, {
    eventBlock: {
        value: function () {
            const $structure = $('<span>')
                .addClass('events');

            // Creates the lanes
            const containers = ['Personal', 'Shared'];
            containers.forEach(c => {
                const $container = $('<span>')
                    .addClass('events__container')
                    .attr('id', c);
                $structure.append($container)
            })

            // Appends everything to section
            $printArea.append($structure);
        }
    },
    taskLanes: {
        value: function () {

        }
    }
})

module.exports = eventManager;