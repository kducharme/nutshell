const $ = require('jquery');

// Clears fields after submission of a form/input
const clearInputs = (id) => {
    console.log(id)
    $(`#${id}`).val('')
}

module.exports = clearInputs;