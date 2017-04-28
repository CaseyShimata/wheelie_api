/**
 * Created by AF1 on 4/18/17.
 */

// Require Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the Task schema
var UserSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	password: {type: String, default: "nothing input"},
	picture_url: {type: String, default: "nothing input"},
	motorcycle_decible: {type: Number, default: 0},
	stunts: [{type: Schema.Types.ObjectId, ref: 'Stunt'}]
}, {timestamps: true});

var StuntSchema = new mongoose.Schema({
    _user: {type:Schema.Types.ObjectId, ref: 'User'},
		avg_speed: {type: Number, default: 0},
		avg_angle: {type: Number, default: 0},
		total_angle: {type: Number, default: 0},
		total_time: {type: Number, default: 0},
		total_distance: {type: Number, default: 0},
		stunt_type: {type: String, default: "nothing input"},
		total_score: {type: Number, default: 0},
		screen_recording_url: {type: String, default: "nothing input"},
		video_url: {type: String, default: "nothing input"}
}, {timestamps: true});

mongoose.model('Stunt', StuntSchema); // We are setting this Schema in our Models as 'Task'
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'Task'
