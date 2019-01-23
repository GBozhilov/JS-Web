const http = require('http');
const handlers = require('./handlers');
const statusHandler = require('./handlers/status');
const port = 3000;

http
    .createServer((req, res) => {
        if (req.headers['statusheader'] === 'Full') {
            statusHandler(req, res);
        } else {
            for (let handler of handlers) {
                if (!handler(req, res)) {
                    break;
                }
            }
        }
    })
    .listen(port);

console.log(`Server listening on port: ${port}`);