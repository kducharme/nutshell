const headerManager = require('./interface/headerManager');
const friendManager = require('./interface/friendManager');
const loginManager = require('./interface/loginManager');

// Loads login gate
loginManager.loginScreen();

// Loads page sub-nav
headerManager.createStructure();
headerManager.navigateTabs();

// Loads default page block
friendManager.friendBlock();