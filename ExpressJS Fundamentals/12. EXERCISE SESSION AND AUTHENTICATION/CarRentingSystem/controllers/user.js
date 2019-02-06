const encryption = require('../util/encryption');
const User = require('../models/User');
const Rent = require('../models/Rent');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {
        const userBody = req.body;

        if (!userBody.username || !userBody.password || !userBody.repeatPassword) {
            userBody.error = 'Please Fill All Fields';
            res.render('user/register', userBody);
            return;
        }

        if (userBody.password !== userBody.repeatPassword) {
            userBody.error = 'Both Passwords Should Match';
            res.render('user/register', userBody);
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, userBody.password);

        try {
            const user = await User
                .create({
                    username: userBody.username,
                    hashedPass,
                    firstName: userBody.firstName,
                    lastName: userBody.lastName,
                    salt,
                    roles: ['User']
                });

            req.logIn(user, (err) => {
                if (err) {
                    userBody.error = err;
                    res.render('user/register', userBody);
                    return;
                }

                res.redirect('/');
            })
        } catch (err) {
            console.log(err);
            userBody.error = err;
            res.render('user/register', userBody);
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('login');
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        const userBody = req.body;

        try {
            const {username, password} = userBody;
            const user = await User.findOne({username});

            if (!user) {
                userBody.error = 'Invalid Username';
                res.render('user/login', userBody);
                return;
            }

            if (!user.authenticate(password)) {
                userBody.error = 'Invalid Password';
                res.render('user/login', userBody);
                return;
            }

            req.logIn(user, (err) => {
                if (err) {
                    userBody.error = err;
                    res.render('user/login', userBody);
                    return;
                }

                res.redirect('/');
            })
        } catch (err) {
            console.log(err);
            userBody.error = err;
            res.render('user/login', userBody);
        }
    },
    myRentsGet: (req, res) => {
        const id = req.user._id;

        Rent.find({user: id})
            .populate('car')
            .then(rents => {
                res.render('user/rented', {rents})
            })
    }
};