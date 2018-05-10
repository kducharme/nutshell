const $ = require('jquery');

const taskManager = Object.create(null, {
    getTasks: {
        value: function () {
            return $.ajax('https://nutshell-kd.firebaseio.com/tasks.json?print=pretty')
        }
    },
    createTask: {
        value: function () {
            console.log('woo woo - task added')
            // $.ajax({
            //     url: 'https://nutshell-kd.firebaseio.com/tasks/',
            //     method: 'POST'
            // })
        }
    },
    updateTask: {
        value: function (friend) {
            $.ajax({
                url: `https://nutshell-kd.firebaseio.com/tasks/${friend.key}`,
                method: 'PATCH'
            })
        }
    },
    deleteTask: {
        value: function (friend) {
            $.ajax({
                url: `https://nutshell-kd.firebaseio.com/tasks/${friend.key}`,
                method: 'DELETE'
            })
        }
    }
})

module.exports = taskManager;

/*

Chat
- Add task
- Load task
- Delete task
- Update task

*/