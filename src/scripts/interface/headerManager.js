const $ = require('jquery');
const buttonFactory = require('../factories/buttonFactory');
const $printArea = $('#data');

const headerManager = Object.create(null, {
    createStructure: {
        value: function () {
            const fragment = document.createDocumentFragment();
            const structure = document.createElement('span');
            structure.classList = 'header';
            const button = headerManager.addButton();

            structure.appendChild(button)
            fragment.appendChild(structure)
            $printArea.append(fragment);
        }
    },
    addFilters: {
        value: function () {

        }
    },
    addButton: {
        value: function () {
            const button = buttonFactory('header__button', 'Add new', headerManager.createDropdown)
            button.innerHTML += `<img src='img/arrow-down.svg'>`;
            return button;
        }
    },
    createDropdown: {
        value: function () {

        }
    }
})

module.exports = headerManager;

