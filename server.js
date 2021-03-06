// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var routes = require('./routes.js');
var localPassport = require('./config/local-passport');

var configDB = require('./config/database.js');

// configuration
mongoose.connect(configDB.url); // connect to our database

localPassport(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	//app.use(express.bodyParser()); // get information from html forms
    app.use(express.json());
    app.use(express.urlencoded());

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes
routes(app, passport); // load our routes and pass in our app and fully configured passport

// launch
app.listen(port);
console.log('The magic happens on port ' + port);
