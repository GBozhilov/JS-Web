const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encryption = require('../util/encryption');

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    hashedPass: {
        type: Schema.Types.String,
        required: true
    },
    firstName: {
        type: Schema.Types.String
    },
    lastName: {
        type: Schema.Types.String
    },
    salt: {
        type: Schema.Types.String,
        required: true
    },
    roles: [
        {
            type: Schema.Types.String
        }
    ],
    blockedUsers: [
        {
            type: Schema.Types.String
        }
    ],
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    },
    isInRole: function (role) {
        return this.roles.indexOf(role) !== -1;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, '123');
        return User.create({
            username: 'admin',
            salt,
            hashedPass,
            roles: ['Admin', 'User']
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;
