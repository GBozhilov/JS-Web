const homeHandler = require('./home');
const filesHandler = require('./static-files');
const addProductHandler = require('./product');
const addCategoryHandler = require('./category');

module.exports = [
    homeHandler,
    filesHandler,
    addProductHandler,
    addCategoryHandler
];