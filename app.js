// import express & mongoose modules, start express app
var express = require("express"), 
    mongoose = require("mongoose"),
    passport = require("passport"),
    app = express();

// configuration
require('./config/project')(app);
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/client/app'));

app.use(app.router);

// connect to mongoDB
mongoose.connect('localhost', 'test');

var models = require('./models/index');
var routes = require('./routes/index')(app);

// initialize passport
require("./config/passport");

// start application
var port = app.get('port');
app.listen(port);
console.log("Project.js API going online...")
console.log("Project.js API online: listening on port " + port);
