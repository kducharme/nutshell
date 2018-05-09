const $ = require('jquery');
const $printArea = $('#data');
const buttonFactory = require('../factories/buttonFactory');

const headerManager = Object.create(null, {
    createStructure: {
        value: function () {
            const fragment = document.createDocumentFragment();
            const structure = document.createElement('span');
            structure.classList = 'header';
            const button = headerManager.addButton();
            const filters = headerManager.addFilters();

            structure.appendChild(filters)
            structure.appendChild(button)
            fragment.appendChild(structure)
            $printArea.append(fragment);
        }
    },
    addFilters: {
        value: function () {
            const structure = document.createElement('span');
            const filters = ['Friends', 'Events', 'Articles']
            structure.classList = 'header__filterList';
            filters.forEach(filter => {
                const block = document.createElement('span');
                block.classList = 'header__filterList--block'

                const filterName = document.createElement('p');
                filterName.classList = 'header__filterList--label'
                filterName.textContent = filter;

                const counter = document.createElement('p');
                counter.classList = 'header__filterList--counter'
                counter.textContent = headerManager.countFilters();
                
                block.appendChild(filterName)
                block.appendChild(counter)
                structure.appendChild(block)
            })
            return structure;
        }
    },
    countFilters: {
        // TODO -- HOOK UP FILTER COUNTERS
        value: function () {
            const count = Math.floor(Math.random() * 10);
            return count;
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
            const structure = document.createElement('span')
            console.log('dropdown active')
        }
    }
})

module.exports = headerManager;

