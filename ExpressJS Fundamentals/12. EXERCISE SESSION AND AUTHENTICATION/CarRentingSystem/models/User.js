const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.String, required: true, unique: true},
    hashedPass: {type: mongoose.Schema.Types.String, required: true},
    firstName: {type: mongoose.Schema.Types.String},
    lastName: {type: mongoose.Schema.Types.String},
    salt: {type: mongoose.Schema.Types.String, required: true},
    roles: [{type: mongoose.Schema.Types.String}]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdmin = async () => {
    try {
        const users = await User.find();

        if (users.length > 0) {
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'Admin');

        return User.create({
            username: 'Admin',
            hashedPass,
            firstName: 'Gosho',
            lastName: 'Bozhilov',
            salt,
            roles: ['Admin']
        });
    } catch (err) {
        console.log(err)
    }
};

module.exports = User;
