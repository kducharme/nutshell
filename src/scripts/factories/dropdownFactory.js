const $ = require('jquery');

const dropdownFactory = (button, options, eventListener, addLeft, addTop, optionEvent) => {
    const structure = document.createElement('span');
    const buttonPosition = $(button).position()

    // Creates background that, on click, closes dropdown
    const bg = document.createElement('span');
    bg.classList = 'dropdown__background';
    bg.addEventListener('click', eventListener)

    // Create dropdown structure
    const dropdown = document.createElement('span');
    dropdown.classList = 'dropdown';

    // Positions dropdown based on button position
    dropdown.style.left = `${buttonPosition.left + addLeft}px`;
    dropdown.style.top = `${buttonPosition.top + addTop}px`;

    // Adds options to the dropdown
    options.forEach(o => {
        const option = document.createElement('p')
        option.textContent = o;
        option.classList = 'dropdown__option';
        option.setAttribute('id', `m${o}`)
        option.addEventListener('click', function (e) {
            const modalManager = require('../modal/modalManager');
            const key = e.target.id;
            modalManager[key]()
        })
        dropdown.appendChild(option);
    })
    structure.appendChild(bg);
    structure.appendChild(dropdown);

    return structure;
}

module.exports = dropdownFactory;