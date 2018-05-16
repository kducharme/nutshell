const $ = require('jquery');
const loginManager = require('../interface/loginManager');
const getCurrentUser = require('../users/getCurrentUser')

// Logs out user
const logOutUser = (user) => {
    $('#currentUser').empty();

    // TODO => Create dropdown for log out feature
    const $printArea = $('#currentUser');
    const $button = $('<button>')
        .attr('id', 'logout')
        .addClass('logOut')
        .text(user.email)
        .on('click', function () {
            firebase.auth().signOut()
                .then($('#data').empty());
        });
    $printArea.append($button)
}

// logOutUser()

module.exports = logOutUser;