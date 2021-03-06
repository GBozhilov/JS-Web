const url = require('url');
const fs = require('fs');
const path = require('path');
//const db = require('../config/database');
const multiparty = require('multiparty');
const shortid = require('shortid');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/product/add' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/product/add.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);

                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('Resource not found!');
                res.end();
                return;
            }

            Category
                .find()
                .then((categories) => {
                    let replacement = '<select class="input-field" name="category">';

                    categories.forEach((category) => {
                        replacement += `<option value="${category._id}">${category.name}</option>`;
                    });

                    replacement += '</select>';

                    let html = data.toString().replace('{categories}', replacement);

                    res.write(html);
                    res.end();
                });
        })
    } else if (req.pathname === '/product/add' && req.method === 'POST') {
        let form = new multiparty.Form();
        let product = {};

        form.on('part', (part) => {
            if (part.filename) {
                let dataString = '';
                let extension = part.filename.split('.')[1];

                part.setEncoding('binary');
                part.on('data', (data) => {
                    dataString += data;
                });

                part.on('end', () => {
                    let fileName = shortid.generate();
                    let filePath = `./content/images/${fileName}.${extension}`;

                    product.image = filePath;
                    fs.writeFile(filePath, dataString, {encoding: 'ascii'}, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            } else {
                part.setEncoding('utf-8');
                let field = '';

                part.on('data', (data) => {
                    field += data;
                });

                part.on('end', () => {
                    product[part.name] = field;
                });
            }
        });

        form.on('close', () => {
            Product
                .create(product)
                .then((insertedProduct) => {
                    Category
                        .findById(insertedProduct.category)
                        .then((category) => {
                            category.products.push(insertedProduct._id);
                            category.save();
                        });
                    res.writeHead(302, {
                        Location: '/'
                    });

                    res.end();
                });
        });

        form.parse(req);
    } else {
        return true;
    }
};