var mongoose = require('mongoose');
var House = mongoose.model('House');

exports.getallhouse = function (req, res) {
    House.find(function (err, houses) {
        res.json(houses);
    })
}