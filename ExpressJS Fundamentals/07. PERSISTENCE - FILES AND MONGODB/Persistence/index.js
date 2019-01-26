const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const util = require('util');
const port = 8080;

http
    .createServer(function (req, res) {
        if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
            let form = new formidable.IncomingForm();

            form.parse(req, function (err, fields, files) {
                res.writeHead(200, { 'content-type': 'text/plain' });
                res.write('received upload:\n\n');
                res.end(util.inspect({ fields: fields, files: files }));
            });

            return;
        }
        
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(
            '<form action="/upload" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="title"><br>' +
            '<input type="file" name="upload" multiple="multiple"><br>' +
            '<input type="submit" value="Upload">' +
            '</form>'
        );
    })
    .listen(port, err => console.log(`Server started at port: ${port}`));