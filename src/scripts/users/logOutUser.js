const $ = require('jquery');
const loginManager = require('../interface/loginManager');
const getCurrentUser = require('../users/getCurrentUser')

// Logs out user
const logOutUser = (user) => {
    // TODO => Create dropdown for log out feature
    const $printArea = $('#currentUser');
    const $structure = $('<span>')
        .addClass('logout');
    
    const $user = $('<p>')
        .addClass('logout__user')
        .text(user.email);

    const $button = $('<button>')
        .attr('id', 'logout')
        .addClass('logout__button')
        .text(`(Log out)`)
        .on('click', function () {
            firebase.auth().signOut()
                .then($('#data').empty())
                .then($('.nav__left').empty())
                .then($('.logout').empty());
                
        });

    $structure.append($user, $button)

    $printArea.append($structure)
}

// logOutUser()

module.exports = logOutUser;