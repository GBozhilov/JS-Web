const controllers = require('../controllers');
const auth = require('./auth');

module.exports = (app) => {
    // Home
    app.get('/', controllers.homeController.index);

    // User
    app.get('/user/register', auth.isAnonymous, controllers.userController.registerGet);
    app.post('/user/register', auth.isAnonymous, controllers.userController.registerPost);

    app.get('/user/login', auth.isAnonymous, controllers.userController.loginGet);
    app.post('/user/login', auth.isAnonymous, controllers.userController.loginPost);

    app.get('/user/details', auth.isAuthed, controllers.userController.detailsGet);
    app.post('/user/details', auth.isAuthed, controllers.userController.detailsPost);

    app.get('/user/logout', auth.isAuthed, controllers.userController.logout);

    // Article
    app.get('/article/create', auth.isAuthed, controllers.articleController.createGet);
    app.post('/article/create', auth.isAuthed, controllers.articleController.createPost);

    app.get('/article/edit/:id', auth.isAuthed, controllers.articleController.editGet);
    app.post('/article/edit/:id', auth.isAuthed, controllers.articleController.editPost);

    app.get('/article/delete/:id', auth.hasRole('Admin'), controllers.articleController.deleteGet);
    app.post('/article/delete/:id', auth.hasRole('Admin'), controllers.articleController.deletePost);

    app.get('/article/details/:id', controllers.articleController.details);
};