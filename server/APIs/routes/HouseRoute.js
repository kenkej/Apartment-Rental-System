var multer = require('multer');
const path = require('path');

const multerConfig = {
    storage: multer.diskStorage({
        //Setup where the user's file will go
        destination: function (req, file, next) {
            next(null, path.dirname(path.dirname(__dirname)) + '/houseimages');
        },

        //Then give the file a unique name
        filename: function (req, file, next) {
            const ext = file.mimetype.split('/')[1];
            next(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }
    }),
    //A means of ensuring only images are uploaded. 
    fileFilter: function (req, file, next) {
        if (!file) {
            next();
        }
        const image = file.mimetype.startsWith('image/');
        if (image) {
            console.log('photo uploaded');
            next(null, true);
        } else {
            console.log("file not supported");
            //TODO:  A better message response to user on failure.
            return next();
        }
    }
};
var HouseController = require('../controllers/HouseController');

module.exports = function (app) {
    app.route('/getallhouse')
        .get(HouseController.getallhouse);
    
    app.route('/postnewhouse')
        .post(multer(multerConfig).single('house'), HouseController.postAHouse)

    app.route('/updateStatus/:id')
        .post(HouseController.updateStatus)
}