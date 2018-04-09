var mongoose = require('mongoose');
var House = mongoose.model('House');
var cloudinary = require('cloudinary');
var path = require('path');
var fs = require('fs');
cloudinary.config({
    cloud_name: 'dm1xjdjyj',
    api_key: '774657244847392',
    api_secret: 'zeUso_zBgugcHzzmwYHp4GGdUnk'
});


exports.getallhouse = function (req, res) {
    House.find({ postFeePaid: true }, function (err, houses) {
        res.json(houses);
    })
}

exports.postAHouse = function (req, res) {
    var fileLink = path.dirname(path.dirname(__dirname)) + '/houseimages/' + req.file.filename
    cloudinary.uploader.upload(fileLink)
        .then(function (imageLink) {
            fs.unlink(fileLink, (err) => { if (err) { console.log(err) } });
            var newHouse = new House({
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                price: req.body.price,
                deposit: req.body.deposit,
                image: imageLink.url
            });
            newHouse.save(function (err, house) {
                if (!err) {
                    res.json({ status: true })
                }
            });
        });
}