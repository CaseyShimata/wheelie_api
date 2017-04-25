/**
 * Created by AF1 on 4/18/17.
 */


// Require the controllers
var stunts_users = require('./../controllers/stunts_users.js');

// Define the routes
module.exports = function(app) {

    // Tasks routes ===================================================
    app.get('/stunts/all', function(req, res) {
			console.log(" hit the get all stunts route on the api");
        stunts_users.get_all_stunts(req, res);
    });
		app.post('/stunts/newstunt', function(req, res) {
				console.log("hit the newstunt route on the api");
				stunts_users.post_stunt_to_db(req, res);
    });
		app.post('/users/register', function(req, res) {
        stunts_users.register(req, res);
    });
		app.post('/users/login', function(req, res) {
        stunts_users.login(req, res);
    });
		app.post('/users/soundcheck', function(req, res) {
        stunts_users.check_sound_decible_of_current_user(req, res);
    });
		app.get('/users/:user_id', function(req, res) {
        stunts_users.get_one_user_using_param_id(req, res);
    });
		app.get('/stunts/:user_id', function(req, res) {
        stunts_users.get_one_users_stunts_using_param_id(req, res);
    });
		app.get('/stunts/currentuser', function(req, res) {
        stunts_users.get_current_users_stunts(req, res);
    });
};
