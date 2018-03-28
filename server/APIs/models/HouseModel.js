var mongoose = require('mongoose');
var HouseSchema = mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    deposit: Number
}, {
    collection : 'houses',
    max: 1000
});

module.exports = mongoose.model('House', HouseSchema)