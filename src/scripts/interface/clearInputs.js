const $ = require('jquery');

// Clears fields after submission of a form/input
const clearInputs = (id) => {
    $(`#${id}`).val('')
}

module.exports = clearInputs;