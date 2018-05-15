const headerManager = require('./interface/headerManager');
const friendManager = require('./interface/friendManager');
const loginManager = require('./interface/loginManager');
const userDatabase = require('./database/userDatabase');
const friendDatabase = require('./database/friendDatabase');

// Loads login gate
loginManager.loginScreen();

// Gets current user then loads UI
const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // Loads all users
        userDatabase.loadAllUsers();

        // Loads all users
        friendDatabase.loadAllFriends();

        // Loads page sub-nav
        headerManager.createStructure();
        headerManager.navigateTabs();

        // Loads default page block
        friendManager.friendBlock();
    }
})
