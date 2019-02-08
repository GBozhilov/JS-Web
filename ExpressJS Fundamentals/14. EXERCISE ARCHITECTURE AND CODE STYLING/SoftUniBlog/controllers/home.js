const Article = require('../models/Article');

module.exports = {
    index: (req, res) => {
        Article.find()
            .populate('author')
            .then((articles => {
                let data = {articles};

                if (req.query.error) {
                    data.error = req.query.error;
                } else if (req.query.success) {
                    data.success = req.query.success
                }

                res.render('home/index', data);
            }))
            .catch(err => {
                console.log(err);
                res.render('home/index', {error: 'Something went wrong!'});
            });
    }
};