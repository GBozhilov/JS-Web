const http = require('http');
const port = 8080;

http
    .createServer((req, res) => {
        res.write('Hello World');
        res.end();
    })
    .listen(port);

console.log(`Web server started at port: ${port}`);