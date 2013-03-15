// import express & mongoose modules, start express app
var express = require("express")
  , mongoose = require("mongoose")
  , passport = require("passport")
  , app = express();


// configuration
var port = 3000;
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose.connect('localhost', 'test');

// import project.js models
require('./models/user');
require('./models/project');
require('./models/role');
// import project.js routes
require('./routes/index')(app);
require('./routes/user')(app);
require('./routes/role')(app);
require('./routes/project')(app);
require('./routes/utility')(app);

// initialize passport
require("./config/passport");

// start application
app.listen(port);
console.log("Project.js API going online...")
console.log("Project.js API online: listening on port " + port);
