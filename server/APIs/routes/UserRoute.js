//Controller implementation
var UserController = require('../controllers/UserController');

module.exports = function(app){
    app.route('/login')
        .post(UserController.login);
}