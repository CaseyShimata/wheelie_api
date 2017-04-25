/**
 * Created by peachteaboba on 4/18/17.
 */

// =========================================================================
// ============================== Require ==================================
// =========================================================================
var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
require('colors');

var sessionConfig = {
 secret:'itssecretyo', // Secret name for decoding secret and such
 resave:false, // Don't resave session if no changes were made
 saveUninitialized: true, // Don't save session if there was nothing initialized
 name:'myCookie', // Sets a custom cookie name
 cookie: {
  secure: false, // This need to be true, but only on HTTPS
  httpOnly:false, // Forces cookies to only be used over http
  maxAge: 360000000
 }
}

// Use session with our app

// =========================================================================
// =============================== Setup ===================================
// =========================================================================
var app = express();
app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({ extended: true })); // <----- need this to recieve req.body from iOS call
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static("./bower_components"));

// =========================================================================
// ============================= Database ==================================
// =========================================================================
require('./server/config/mongoose.js');


// =========================================================================
// =============================== Routes ==================================
// =========================================================================
require('./server/config/routes.js')(app);


// =========================================================================
// =============================== Listen ==================================
// =========================================================================
app.listen(8000, function() {
    console.log("It's over 8000!!!".blue);
});
