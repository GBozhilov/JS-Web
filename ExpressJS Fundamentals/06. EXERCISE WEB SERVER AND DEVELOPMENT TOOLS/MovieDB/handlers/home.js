const url = require('url');
const fs = require('fs');
const path = require('path');
const errorHandler = require('./error-handler');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/home.html'));
        let stream = fs.createReadStream(filePath);

        stream.on('error', (err) => {
            errorHandler(err, res);
        });

        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        stream.pipe(res);
    } else {
        return true;
    }
};