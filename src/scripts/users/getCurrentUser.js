const $ = require('jquery');

// Checking whether or not user is logged in
let currentUser = null;

const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        currentUser = firebaseUser;
        $('.modal__bg').hide()
    }
    else {
        loginModal.classList.remove('hide');
        console.log('User does not exist');
    }
})

const getCurrentUser = () => {
    return currentUser;
    console.log(currentUser)
}

const setCurrentUser = (user) => {
    currentUser = user;
    console.log(currentUser)
}

module.exports = {
    getCurrentUser,
    setCurrentUser
};
