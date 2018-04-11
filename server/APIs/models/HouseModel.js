var mongoose = require('mongoose');
var HouseSchema = mongoose.Schema({
    name: String,
    address: String,
    description: String,
    image: String,
    price: Number,
    deposit: Number,
    contractAddress: String
}, {
        collection: 'houses',
        max: 1000
    });

module.exports = mongoose.model('House', HouseSchema)