const Thread = require('../models/Thread');
const User = require('../models/User');
const Message = require('../models/Message');

module.exports = {
    findThreads: async (req, res) => {
        try {
            const username = req.body.username;
            const searchedUser = await User.findOne({username});

            if (!searchedUser) {
                res.locals.globalError = 'There is no such username';
                res.render('home/index', {username});
                return;
            }

            const searchedUserId = searchedUser._id;
            const loggedUserId = req.user._id;

            if (searchedUserId.equals(loggedUserId)) {
                res.locals.globalError = 'Can not chat with yourself';
                res.render('home/index', {username});
                return;
            }

            const thread = await Thread.findOne({
                users: {
                    $all: [loggedUserId, searchedUserId]
                }
            });

            if (!thread) {
                await Thread.create({
                    users: [loggedUserId, searchedUserId]
                });
            }

            res.redirect(`/thread/${searchedUser.username}`)
        } catch (err) {
            console.log(err);
        }
    },
    openThread: async (req, res) => {
        try {
            const username = req.params.username;
            const recipient = await User.findOne({username});
            const recipientId = recipient._id;
            const currentUserId = req.user._id;

            const thread = await Thread.findOne({
                users: {$all: [currentUserId, recipientId]}
            });

            const threadId = thread._id;
            const messages = await Message.find({thread: threadId});

            messages.map(m => {
                m.isLeft = m.user.equals(req.user._id);
                m.isImage = m.content.startsWith('https://')
                    && m.content.endsWith('.jpg');
            });

            const recBlockedUsers = recipient.blockedUsers;
            const myUsername = req.user.username;

            const myBlockedUsers = req.user.blockedUsers;
            const recUsername = username;

            const amIBlocked = recBlockedUsers.includes(myUsername);
            const isOtherBlocked = myBlockedUsers.includes(recUsername);

            res.render('thread/chatroom', {username, messages, threadId, amIBlocked, isOtherBlocked});
        } catch (err) {
            console.log(err);
        }
    },
    sendMessage: async (req, res) => {
        const {content, threadId} = req.body;
        const recipientUsername = req.params.username;

        try {
            const recipient = await User.findOne({username: recipientUsername});
            const recipientId = recipient._id;

            await Message.create({
                content,
                user: recipientId,
                thread: threadId
            });

            res.redirect('/thread/' + recipientUsername);
        } catch (err) {
            console.log(err);
        }
    },
    removeThread: async (req, res) => {
        const id = req.params.id;

        try {
            await Thread.remove({_id: id});
            await Message.remove({thread: id});

            res.redirect('/')
        } catch (err) {
            console.log(err);
        }
    }
};