const Thread = require('../models/Thread');

module.exports = {
    index: async (req, res) => {
        try {
            let threads;

            if (req.user && req.user.roles.indexOf('Admin') !== -1) {
                threads = await Thread.find()
                    .populate('users');

                threads.forEach(t => {
                    t.date = t.dateCreated.toDateString();
                });
            }

            res.render('home/index', {threads});
        } catch (err) {
            console.log(err);
        }
    }
};