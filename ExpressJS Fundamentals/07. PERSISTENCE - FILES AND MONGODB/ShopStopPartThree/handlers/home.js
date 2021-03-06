const url = require('url');
const fs = require('fs');
//const database = require('../config/database');
const qs = require('querystring');
const path = require('path');
const Product = require('../models/Product');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);

                res.writeHead(404, {
                    'Content-Type': ' text/plain'
                });

                res.write('404 not found');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': ' text/html'
            });

            Product
                .find()
                .then((products) => {
                    let queryData = qs.parse(url.parse(req.url).query);

                    if (queryData.query) {
                        products = products.filter((p) => {
                            let productName = p.name.toLowerCase();
                            let searched = queryData.query.toLowerCase();

                            return productName.includes(searched);
                        });
                    }

                    let content = '';

                    for (let product of products) {
                        content +=
                            `<div class="product-card">
                        <img class="product-img" src="${product.image}">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                    </div>`;
                    }

                    let html = data.toString().replace('{content}', content);

                    res.write(html);
                    res.end();
                });
        })
    } else {
        return true;
    }
};