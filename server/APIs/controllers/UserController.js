var mongoose = require('mongoose');
var User = mongoose.model('User');

//Controller function to check login
exports.login = function (req, res) {
    User.find({ username: req.body.username }, function (err, user) {
        if (user.length !== 0) {
            res.json(user);
        }
        else {
            res.json({failed : true});
        }
    });
}