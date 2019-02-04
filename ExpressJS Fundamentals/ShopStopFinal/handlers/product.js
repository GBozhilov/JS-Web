const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
    Category
        .find()
        .then((categories) => {
            res.render('product/add', {categories})
        });
};

module.exports.addPost = async (req, res) => {
    let productObj = req.body;
    productObj.image = '\\' + req.file.path;

    let product = await Product.create(productObj);
    let category = await Category.findById(product.category);
    category.products.push(product._id);
    category.save();

    res.redirect('/');
};

module.exports.editGet = (req, res) => {
    const id = req.params.id;

    Product
        .findById(id)
        .then(product => {
            if (!product) {
                res.sendStatus(404);
                return;
            }

            Category
                .find()
                .then(categories => {
                    res.render('product/edit', {product, categories})
                });
        })
};

module.exports.editPost = async (req, res) => {
    const id = req.params.id;
    const editedProduct = req.body;

    const product = await Product.findById(id);

    if (!product) {
        res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
        return;
    }

    product.name = editedProduct.name;
    product.description = editedProduct.description;
    product.price = editedProduct.price;

    if (req.file) {
        product.image = '\\' + req.file.path;
    }

    if (product.category.toString() !== editedProduct.category) {
        Category
            .findById(product.category)
            .then(currentCategory => {
                Category
                    .findById(editedProduct.category)
                    .then(newCategory => {
                        const index = currentCategory.products.indexOf(product._id);

                        if (index >= 0) {
                            currentCategory.products.splice(index, 1)
                        }

                        currentCategory.save();

                        newCategory.products.push(product._id);
                        newCategory.save();

                        product.category = editedProduct.category;

                        product
                            .save()
                            .then(() => {
                                res.redirect(`/?success=${encodeURIComponent('Product was edited successfully!')}`);
                            });
                    })
            })
    } else {
        product
            .save()
            .then(() => {
                res.redirect(`/?success=${encodeURIComponent('Product was edited successfully!')}`);
            });
    }
};

module.exports.deleteGet = (req, res) => {
    const id = req.params.id;

    Product
        .findById(id)
        .then(product => {
            if (!product) {
                res.sendStatus(404);
                return;
            }

            res.render('product/delete', {product});
        })
};

module.exports.deletePost = (req, res) => {
    const id = req.params.id;

    Product
        .findById(id)
        .then(product => {
            if (!product) {
                res.sendStatus(404);
                return;
            }

            Category
                .findById(product.category)
                .then(category => {
                    const index = category.products.indexOf(product._id);

                    if (index >= 0) {
                        category.products.splice(index, 1);
                        category.save();
                    }

                    Product
                        .remove({_id: id})
                        .then(() => {
                            fs.unlink(path.normalize(path.join('.', product.image)), () => {
                                res.redirect(`/?success=${encodeURIComponent('Product was deleted successfully!')}`);
                            })
                        });
                });
        })
};

module.exports.buyGet = (req, res) => {
    const id = req.params.id;

    Product
        .findById(id)
        .then(product => {
            if (!product) {
                res.sendStatus(404);
                return;
            }

            res.render('product/buy', {product});
        })
};