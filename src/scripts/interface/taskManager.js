const $ = require('jquery');
const $printArea = $('#data');

// Manages the friend view
const taskManager = Object.create(null, {
    taskBlock: {
        value: function () {
            const $structure = $('<span>')
                .addClass('tasks');

            // Creates the lanes
            const lanes = ['Backlog', 'In Progress', 'Complete'];
            lanes.forEach(l => {
                const $lane = $('<span>')
                    .addClass('tasks__lane')
                    .attr('id', l);
                $structure.append($lane)
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

module.exports = taskManager;