const homeHandler = require('./home');
const filesHandler = require('./static-files');
const addHandler = require('./product');

module.exports = [
    homeHandler,
    filesHandler,
    addHandler
];