const fs = require('fs');
const path = require('path');
const url = require('url');
const errorHandler = require('./error-handler');
const contentTypes = require('../config/contentTypes');

function getContentType(url) {
    const extension = url.substring(url.lastIndexOf('.') + 1);
    return contentTypes[extension];
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname.startsWith('/public/') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '..' + req.pathname));
        let stream = fs.createReadStream(filePath);

        stream.on('error', (err) => {
            errorHandler(err, res);
        });

        res.writeHead(200, {
            'Content-Type': getContentType(req.pathname),
        });

        stream.pipe(res);
    } else {
        return true;
    }
};