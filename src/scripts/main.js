const $ = require('jquery');

const headerManager = require('./interface/headerManager');
const friendManager = require('./interface/friendManager');
const loginManager = require('./interface/loginManager');
const userDatabase = require('./database/userDatabase');
const friendDatabase = require('./database/friendDatabase');
const logOutUser = require('./users/logOutUser')

// Loads login gate
loginManager.loginScreen();

// Gets current user then loads UI
const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // Load all users
        userDatabase.loadAllUsers();

        // Loads logout dropdown
        logOutUser(firebaseUser);
        
        // Loads page sub-nav
        headerManager.createStructure();
        
        // Loads default page block
        friendManager.friendBlock();
        
        // Load the user's friends
        friendDatabase.loadAllFriends();

    }
})
