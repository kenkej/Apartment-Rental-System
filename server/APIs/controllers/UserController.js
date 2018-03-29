var mongoose = require('mongoose');
var User = mongoose.model('User');

//Controller function to check login
exports.login = function (req, res) {
    User.find({ username: req.body.username }, function (err, user) {
        if (user.length !== 0) {
            res.json(user);
        }
        else {
            res.json({ failed: true });
        }
    });
}

exports.checkUser = function (req, res) {
    User.find({ username: req.params.username }, function (err, users) {
        if (users.length !== 0) {
            res.json({ existed: true });
        }
        else {
            res.json({});
        }
    });
}

exports.register = function (req, res) {
    var newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save(function (err, newUser) {
        if (!err) {
            res.json({ success: true })
        }
        else {
            res.json({});
        }
    })
}