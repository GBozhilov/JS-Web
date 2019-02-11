const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);


    app.get('/user/register', restrictedPages.isAnonymous, controllers.user.registerGet);
    app.post('/user/register', restrictedPages.isAnonymous, controllers.user.registerPost);

    app.get('/user/logout', restrictedPages.isAuthed, controllers.user.logoutGet);
    app.post('/user/logout', restrictedPages.isAuthed, controllers.user.logoutPost);

    app.get('/user/login', restrictedPages.isAnonymous, controllers.user.loginGet);
    app.post('/user/login', restrictedPages.isAnonymous, controllers.user.loginPost);

    app.post('/user/block/:username', restrictedPages.isAuthed, controllers.user.block);
    app.post('/user/unblock/:username', restrictedPages.isAuthed, controllers.user.unblock);


    app.post('/threads/find', restrictedPages.isAuthed, controllers.thread.findThreads);

    app.get('/thread/:username', restrictedPages.isAuthed, controllers.thread.openThread);
    app.post('/thread/:username', restrictedPages.isAuthed, controllers.thread.sendMessage);

    app.post('/thread/remove/:id', restrictedPages.hasRole('Admin'), controllers.thread.removeThread);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};