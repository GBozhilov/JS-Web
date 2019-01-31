const mongoose = require('mongoose');
const connectionStr = 'mongodb://admin:abc123@ds115198.mlab.com:15198/expressjs-course';
const urlParser = {useNewUrlParser: true};

module.exports = function initData() {
    mongoose.connect(connectionStr, urlParser);
};

