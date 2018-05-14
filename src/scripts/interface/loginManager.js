const $ = require('jquery');
const $body = $('body');
const modalFactory = require('../factories/modalFactory');
const buttonFactory = require('../factories/buttonFactory');


const loginManager = Object.create(null, {
    createAccount: {
        value: function() {
            // TODO - get user email and password
            const auth = firebase.auth();
            const promise = auth.signInWithEmailAndPassword(email, pass);
            promise.catch(e => console.log(e.message))
        }
    },
    loginScreen: {
        value: function() {
            // Arguments for modal factory
            const title = 'Welcome to nutshell'
            const details = 'nutshell is a one-sotp-shop for managing all of your tasks, events, and favorite articles. ';
            const inputs = ['Email address', 'Password']
            const button = buttonFactory('modal__content--button', 'Create account', (function () {
                loginManager.createAccount()
            }));
            const modal = modalFactory(title, details, inputs, button);

            // Customizing modal
            $('.modal').addClass('modal__full');
            $('.modal__bg').addClass('modal__full--bg');
            $('.material-icons').remove();
        }
    }
})

module.exports = loginManager;