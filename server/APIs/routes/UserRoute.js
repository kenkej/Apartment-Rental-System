//Controller implementation
var UserController = require('../controllers/UserController');

module.exports = function(app){
    app.route('/login')
        .post(UserController.login);

    app.route('/register')        
        .post(UserController.register);

    app.route('/register/:username')
        .get(UserController.checkUser);
}