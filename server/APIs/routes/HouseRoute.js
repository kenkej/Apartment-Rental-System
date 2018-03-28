var HouseController = require('../controllers/HouseController');

module.exports = function (app) {
    app.route('/getallhouse')
        .get(HouseController.getallhouse);
}