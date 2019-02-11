const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {
        const userBody = req.body;
        const {username, password, confirmPassword, firstName, lastName} = userBody;

        if (!username || !password || !confirmPassword) {
            res.locals.globalError = 'Please fill all fields';
            res.render('user/register', userBody);
            return;
        }

        if (password !== confirmPassword) {
            res.locals.globalError = 'Passwords are different';
            res.render('user/register', userBody);
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, password);
        try {
            const user = await User.create({
                username,
                hashedPass,
                salt,
                firstName,
                lastName,
                roles: ['User']
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('user/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('user/register', userBody);
        }
    },
    logoutGet: (req, res) => {
        res.redirect('/');
    },
    logoutPost: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        const userBody = req.body;
        try {
            const user = await User.findOne({username: userBody.username});

            if (!user) {
                errorHandler('Invalid username', userBody);
                return;
            }

            if (!user.authenticate(userBody.password)) {
                errorHandler('Invalid password', userBody);
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err, userBody);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e, userBody);
        }

        function errorHandler(e, reqUser) {
            console.log(e);
            res.locals.globalError = e;
            res.render('user/login', reqUser);
        }
    },
    block: async (req, res) => {
        const username = req.params.username;

        try {
            req.user.blockedUsers.push(username);
            const user = req.user;
            await user.save();

            res.redirect(`/thread/:${username}`);
        } catch (err) {
            console.log(err);
        }
    },
    unblock: async (req, res) => {
        const username = req.params.username;

        try {
            req.user.blockedUsers = req.user.blockedUsers.filter(u => {
                return u !== username;
            });
            const user = req.user;
            await user.save();

            res.redirect(`/thread/:${username}`);
        } catch (err) {
            console.log(err);
        }
    }
};