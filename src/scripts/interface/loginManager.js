const $ = require('jquery');
const $body = $('body');
const modalFactory = require('../factories/modalFactory');
const buttonFactory = require('../factories/buttonFactory');
const clearInputs = require('./clearInputs');
// const firebase = require('firebase');

const loginManager = Object.create(null, {
    createUser: {
        value: function () {
            // TODO - get user email and password
            const $email = $('#id__Email').val();
            const $password = $('#id__Password').val();

            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword($email, $password).then((user) => {
                setCurrentUser(user)
            })
            .then(clearInputs('id__Email'))
            .then(clearInputs('id__Password'))
            .catch(e => console.log(e.message));
        }

    },
    loginScreen: {
        value: function () {
            // Arguments for modal factory
            const title = 'Welcome to nutshell'
            const details = 'nutshell is a one-stop-shop for managing all of your friends, tasks, events, and  articles. ';
            const inputs = ['Email address', 'Password']
            const button = buttonFactory('modal__content--button', 'Create account', (function () {
                loginManager.createUser()
            }));
            const modal = modalFactory(title, details, inputs, button);
            $('#id__Password').attr('type', 'password')

            // Customizing modal
            $('.modal').addClass('modal__full');
            $('.modal__bg').addClass('modal__full--bg');
            $('.material-icons').remove();
        }
    },
    loginUser: {
        value: function () {
            const promise = auth.signInWithEmailAndPassword($email, $password);
        }
    }
})

module.exports = loginManager;