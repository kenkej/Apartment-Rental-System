var mongoose = require('mongoose');
var HouseSchema = mongoose.Schema({
    owner: {
        type:String,
        default: 'Owner'
    },// this is the house owner's wallet address
    name: String,
    address: String,
    description: String,
    image: String,
    price: Number,
    deposit: Number,
    available: {
        type: Boolean,
        default: true
    },
    postFeePaid: {
        type: Boolean,
        default: false
    }
}, {
        collection: 'houses',
        max: 1000
    });

module.exports = mongoose.model('House', HouseSchema)