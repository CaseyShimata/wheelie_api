/**
 * Created by AF1 on 4/18/17.
 */

// Require Mongoose
var mongoose = require('mongoose');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var User = mongoose.model('User');
var Stunt = mongoose.model('Stunt');


module.exports = (function() {
    return {
			get_all_stunts: function (req, res){
  			Stunt.find({}).populate('_user').exec(function (err, data) {
    			if (err) {
        		console.error(`Error: ${error}`)
        		res.send(`Error: ${error}`)
    			}
					else {
        		console.log(data)

        		res.json(data)
    			}
  			})
			},
			post_stunt_to_db: function (req, res){
				console.log(req.body + "********* req.body from line 27 stunts_users")
				console.log(req.body.avg_speed + "******** avg_speed from 28 in stunts_users.js")
				console.log(req.session.user + "******** session user ")
				var newstunt = new Stunt({
					_user: req.session.user._id,
					avg_speed: req.body.avg_speed,
					avg_angle: req.body.avg_angle,
					total_angle: req.body.total_angle,
					total_time: req.body.total_time,
					total_distance: req.body.total_distance,
					stunt_type: req.body.stunt_type,
					total_score: req.body.total_score,
					screen_recording_url: req.body.screen_recording_url,
					video_url: req.body.video_url
				});
				newstunt.save(function(err, data){
					if(err){
						res.status(400).send("Problem saving post");
					}
					else{
						console.log(data)
						res.json(data);
					}
				})
			},
			register: function (req, res){
				User.findOne({username: req.body.username}).exec(function(err, data){
					if(err){
						res.status(400).send({})
					}
					else {
						if (!data) {
							console.log("Good !!! User doesnt exist yet found.")
							var user = new User({username: req.body.username, password: req.body.password, picture_url: req.body.picture_url, motorcycle_decible: req.body.motorcycle_decible});
							user.save(function(err){ //.save with the new User saves the req.body keys values in the database
								if(err){
									res.status(400).send("User did not save.")
								}
								else{
									req.session.user = user;
									console.log(user)
									res.json(user)
								}
							})
						}
						else {
							console.log("user exists")
							res.status(400).send({message: "user exists"})
						}
					}
				})
			},
				/// ------ db says - Error: Illegal arguments: undefined, string >

			login: function (req, res){
				User.findOne({username: req.body.username}).exec(function(err, data){
					if (data) {
						console.log("Good.. User exists.")
						var db_user = data
						var user = req.body
						if (db_user.password == user.password) {
							console.log(user)
							req.session.user = data;
							console.log(req.session.user.username)
							res.json(user)
						}
						else {
							console.log("user pass doesn't match")
							res.status(400).send({message: "user pass doesn't match"})
						}
					}
					else {
						res.status(400).send({message: "user with username entered doesn't exist"})
					}
				})
			},
			check_sound_decible_of_current_user: function(req, res){
				User.findOne({username: req.session.user.username}).exec(function(err, data){
					if(data.motorcycle_decible == null){
						data.motorcycle_decible = req.session.user.motorcycle_decible
						data.save(function(err,data){ //.save with the new User saves the req.body keys values in the database
							if(err){
								res.status(400).send("User decible did not save.")
							}
							else{
								req.session.user = data;
								req.session.user.match_decibel = true;
								res.sendStatus(200);
							}
						})
					}
					else{
						if(req.session.user.motorcycle_decible == data.motorcycle_decible){
							req.session.user.match_decibel = true; //user from login form/ user in the logincontroller/ data: user in the mainfactory/ to session in the server controller and thus server
							res.sendStatus(200);
						}
						else{
							req.session.user.match_decibel = false;
							res.status(400).send('I could not hear your motorcycle');
						}
					}
				})
			},
			get_one_user_using_param_id: function (req, res){
				User.findOne({_id: req.params.user_id}).exec(function (err, data) {
    			if (err) {
        		console.error(`Error: ${error}`)
        		res.send(`Error: ${error}`)
    			}
					else {
        		console.log(data)
        		res.json(data)
    			}
  			})
			},
			get_one_users_stunts_using_param_id: function (req, res){
				User.findOne({username: req.params.username}).populate('stunts').exec(function (err, data) {
    			if (err) {
        		console.error(`Error: ${error}`)
        		res.send(`Error: ${error}`)
    			}
					else {
        		console.log(data)
        		res.json(data)
    			}
  			})
			},
			get_current_users_stunts: function (req, res){
				User.findOne({_id: req.session.user._id}).populate('stunts').exec(function (err, data) {
    			if (err) {
        		console.error(`Error: ${error}`)
        		res.send(`Error: ${error}`)
    			}
					else {
        		console.log(data)
        		res.json(data)
    			}
  			})
			},
    }
})()
