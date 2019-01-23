const http = require('http');
const url = require('url');
const fs = require('fs');

const port = 8080;

function readFileAsStream(fileName) {
    return fs.createReadStream(`./public/${fileName}`);
}

function getFileExtension(fileName) {
    const parts = fileName.split('.');
    return parts[parts.length - 1];
}

function extractFileNameFromPath(pathname) {
    const parts = pathname.split('/');
    return parts[parts.length - 1];
}

const extensionContentTypes = {
    css: {
        'Content-Type': 'text/css'
    },
    js: {
        'Content-Type': 'application/javascript'
    }
};

http
    .createServer((req, res) => {
        const parsedUrl = url.parse(req.url);
        const pathname = parsedUrl.pathname;

        if (req.method === 'GET') {
            if (pathname === '/') {
                const index = fs.createReadStream('./public/index.html');

                index.pipe(res);
            } else {
                const fileName = extractFileNameFromPath(pathname);
                const fileStream = readFileAsStream(fileName);
                const extension = getFileExtension(fileName);
                const header = extensionContentTypes[extension];

                res.writeHead(200, header);
                fileStream.pipe(res);
            }
        }
    })
    .listen(port);

console.log(`Web server started at port: ${port}`);