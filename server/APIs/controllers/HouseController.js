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
    House.find(function (err, houses) {
        res.json(houses);
    })
}

exports.updateStatus = function (req, res) {            
    House.findOneAndUpdate({contractAddress : req.body.contractAddress}, 
        { available: req.body.apartmentStatus.includes('Rented') ? false : true},
        function (err, result) {
            if (!err) {
                res.json({ status: true });
            }
            else {
                res.json({ status: false })
            }
        });
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
                image: imageLink.url,
                contractAddress: req.body.contractAddress
            });
            debugger
            newHouse.save(function (err, house) {
                if (!err) {
                    res.json({ status: true })
                }
            });
        });
}