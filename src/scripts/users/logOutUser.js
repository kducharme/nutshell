const $ = require('jquery');

// Logs out user
const logOutUser = () => {
    const loginManager = require('../interface/loginManager');

    // TODO => Create dropdown for log out feature
    const $printArea = $('#currentUser');
    const $button = $('<button>')
        .attr('id', 'logout')
        .text('Log out')
        .on('click', function () {
            firebase.auth().signOut();
            // loginManager.loginScreen();
        });
    $printArea.append($button)
}

logOutUser()

module.exports = logOutUser;