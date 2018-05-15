const $ = require('jquery');
const $body = $('body');
const modalFactory = require('../factories/modalFactory');
const buttonFactory = require('../factories/buttonFactory');
const userDatabase = require('../database/userDatabase');
const clearInputs = require('./clearInputs');
const setCurrentUser = require('../users/getCurrentUser').setCurrentUser;
const auth = firebase.auth();

const loginManager = Object.create(null, {
    createUser: {
        value: function () {
            // TODO - get user email and password
            const $email = $('#id__Email').val();
            const $name = $('#id__Full').val();
            const $password = $('#id__Password').val();
            
            const promise = auth.createUserWithEmailAndPassword($email, $password)
            .then((user) => {
                console.log($name);
                    let userData = {
                        name: $name,
                        email: user.user.email,
                        id: user.user.uid
                    }
                    setCurrentUser(user);
                    userDatabase.createUser(userData);
                })
                .then(clearInputs('id__Email'))
                .then(clearInputs('id__Password'))
                .then(clearInputs('id__Full'))
                .catch(e => console.log(e.message));
        }

    },
    loginScreen: {
        value: function () {
            // Arguments for modal factory
            const title = 'Welcome to nutshell'
            const details = 'nutshell is a one-stop-shop for managing all of your friends, tasks, events, and  articles. ';
            const inputs = ['Full name', 'Email address', 'Password']
            const button = buttonFactory('modal__content--button', 'Create account', (function () {
                loginManager.createUser()
            }));
            const modal = modalFactory(title, details, inputs, button);
            $('#id__Password').attr('type', 'password')

            const signIn = $('<button>')
                .attr('id', 'signIn')
                .addClass('modal__content--button')
                .text('Sign in')
                .on('click', (function () {
                    loginManager.loginUser()
                }));
            $('.modal__content').append(signIn);

            // Customizing modal
            $('.modal').addClass('modal__full');
            $('.modal__bg').addClass('modal__full--bg');
            $('.material-icons').remove();
        }
    },
    loginUser: {
        value: function () {
            const $email = $('#id__Email').val();
            const $password = $('#id__Password').val();
            const promise = auth.signInWithEmailAndPassword($email, $password);
            promise.catch(e => console.log(e.message))
        }
    }
})

module.exports = loginManager;