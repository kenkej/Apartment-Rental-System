var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    username: {
        unique: true,
        type: String
    },
    password: String
}, {
        collection: 'users',
        max: 1000
    });

module.exports = mongoose.model('User', UserSchema);