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
            const tabs = headerManager.addTabs();

            structure.appendChild(tabs)
            structure.appendChild(button)
            fragment.appendChild(structure)
            $printArea.append(fragment);
        }
    },
    addTabs: {
        value: function () {
            const structure = document.createElement('span');
            const tabs = ['Friends', 'Events', 'Articles']
            structure.classList = 'header__tabList';
            tabs.forEach(tab => {
                const block = document.createElement('span');
                block.classList = 'header__tabList--block';
                block.setAttribute('id', tab)
                block.addEventListener('click', function(e) {
                    headerManager.activeTab(e)
                })
                const tabName = document.createElement('p');
                tabName.classList = 'header__tabList--label'
                tabName.textContent = tab;

                const counter = document.createElement('p');
                counter.classList = 'header__tabList--counter'
                counter.textContent = headerManager.countTabs();
                
                block.appendChild(tabName)
                block.appendChild(counter)
                structure.appendChild(block)
            })
            return structure;
        }
    },
    activeTab: {
        value: function (e) {
            let $activeTab = $('#Friends');
            let $activeLabel = $('#Friends')[0].childNodes[0];
            let $activeCounter = $('#Friends')[0].childNodes[1];
            if (e) {
                $activeTab = e.currentTarget;
                $activeLabel = $activeTab.childNodes[0];
                $activeCounter = $activeTab.childNodes[1];
            }
            $('.header__tabList--label').removeClass('activeTab');
            $('.header__tabList--counter').removeClass('activeCounter');
            $activeLabel.classList.add('activeTab');
            $activeCounter.classList.add('activeCounter');
        }
    },
    countTabs: {
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
            const dropdownFactory = require('../factories/dropdownFactory');
            // Requirements for dropdownFactory
            const options = ['Friend', 'Event', 'Article', 'Task']
            const button = $('.header__button');
            const event = (function() {
                headerManager.closeDropdown();
            })
            const $body = $('body')
            const dropdown = dropdownFactory(button, options, event, 15, -5);

            $body.append(dropdown)


            // const background = document.createElement('span');
            // background.classList = 'dropdown__background';
            // background.addEventListener('click', 
            // const dropdown = document.createElement('span');
            // dropdown.classList = 'dropdown';
            // dropdown.style.left = `${buttonPosition.left + 15}px`;
            // dropdown.style.top = `${buttonPosition.top - 5}px`;

            // options.forEach(o => {
            //     const option = document.createElement('p');
            //     option.textContent = o;
            //     option.classList = 'dropdown__option'
            //     dropdown.appendChild(option)  
            // })


            // body.appendChild(background);
            // body.appendChild(dropdown);
        }
    },
    closeDropdown: {
        value: function () {
            $('.dropdown__background').remove();
            $('.dropdown').remove();
        }
    }
})

module.exports = headerManager;

