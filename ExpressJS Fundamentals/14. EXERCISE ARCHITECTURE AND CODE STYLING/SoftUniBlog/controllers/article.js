const Article = require('../models/Article');
const User = require('../models/User');

function arrayRemove(arr, value) {

    return arr.filter(ele => {
        return !ele.equals(value);
    });
}

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },
    createPost: (req, res) => {
        const articleBody = req.body;
        const {title, content} = articleBody;

        if (!title || !content) {
            articleBody.error = 'Please fill all fields!';
            res.render('article/create', articleBody);
            return;
        }

        const author = req.user._id;

        const newArticle = {
            title,
            content,
            author,
        };

        Article.create(newArticle)
            .then((article) => {
                const articleId = article._id;
                const user = req.user;
                user.articles.push(articleId);
                user.save();

                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
                articleBody.error = 'Something went wrong!';
                res.render('article/create', articleBody);
            });
    },
    editGet: (req, res) => {
        const articleId = req.params.id;
        Article.findById(articleId)
            .then(article => {
                res.render('article/edit', article);
            })
            .catch(err => {
                console.log(err);
            });
    },
    editPost: (req, res) => {
        const articleBody = req.body;
        const articleId = req.params.id;

        Article.findById(articleId)
            .then(article => {
                const {title, content} = articleBody;
                article.title = title;
                article.content = content;
                article.date = new Date();

                article.save()
                    .then(() => {
                        res.redirect(`/?success=${encodeURIComponent('Product was edited successfully')}`);
                    })
            })
            .catch(err => {
                console.log(err);
            });
    },
    details: (req, res) => {
        const articleId = req.params.id;

        Article.findById(articleId)
            .populate('author')
            .then(article => {
                const articleAuthorId = article.author._id;
                const loggedUserId = req.user._id;
                article.isAuthor = articleAuthorId.equals(loggedUserId);
                article.dateStr = article.date.toDateString();

                res.render('article/details', article);
            })
            .catch(err => {
                console.log(err);
            });
    },
    deleteGet: (req, res) => {
        const articleId = req.params.id;

        Article.findById(articleId)
            .then(article => {
                res.render('article/delete', article);
            })
            .catch(err => {
                console.log(err);
            });
    },
    deletePost: (req, res) => {
        const articleId = req.params.id;

        Article.remove({_id: articleId})
            .then(() => {
                // const user = req.user;
                // const currentArticles = user.articles;
                // const filtered = arrayRemove(currentArticles, articleId);
                // req.user.articles = filtered;
                // user.articles = filtered;

                req.user.articles.pull(articleId);

                return req.user.save();
            })
            .then(() => {
                res.redirect(`/?success=${encodeURIComponent('Product was deleted successfully')}`);
            })
            .catch(err => {
                console.log(err);
            });
    }
};