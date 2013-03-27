// User Routes
// Project.JS
var mongoose = require('mongoose')
  , passport = require('passport')
  , User = mongoose.model('User')

module.exports = function(app) {
  var prefix = app.get('apiPrefix');
  // GET /user: get all users
  app.get(prefix + "/users", function(req, res) {
    User.find({}, function(err, users) {
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.json(users);
    });
  });

  // POST /user: create a new user
  app.post(prefix + "/users", function(req, res, next) {
    if(!(req.body.userId &&
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password)){
        res.send(500, 'Not enough data to create a new user.');
        res.end();
      }

    var newUser = new User();
    newUser.userId = newUser.username = req.body.userId;
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.isAdmin = req.body.isAdmin || false;

    User.register(newUser, req.body.password, function(err, user) {
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.json(user);
      res.end();
    });
  });

  // GET /user/:user: get specific user information
  app.get(prefix + "/users/:user", function(req, res) {
    res.json(req.user);
  });

  // PUT /user/:user: update user information
  app.put(prefix + "/users/:user", function(req, res) {
    var user = req.user[0];
    if(req.body.firstName) user.firstName = req.body.firstName;
    if(req.body.lastName) user.lastName = req.body.lastName;
    if(req.body.email) user.email = req.body.email;
    if(req.body.password) user.password = req.body.password;
    if(req.body.isAdmin) user.isAdmin = req.body.isAdmin;
    user.save();
    res.send(200, user);
    res.end();
  });

  // POST /user/:user/password: change a user's password
  // arguments:
  // newPassword: the user's desired new password
  app.post(prefix + "/users/:user/password", function(req, res) {
    // make sure required data was sent in HTTP payload
    if(!req.body.newPassword) {
      res.send(500, "Data required: newPassword");
      res.end();
    }

    var user = req.user;
    user.setPassword(req.body.newPassword, function(err, something) {
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.send(something);
      res.end();
    });
  });

  // :user parameter route: finds users &
  // passes them to other route, handles errors
  app.param('user', function(req, res, next, id){
    User.findById(id, function(err, user){
      if (err) {
        res.send(500, err);
        res.end();
      } else if (user) {
        req.user = user;
        next();
      } else {
        res.send(500, "Failed to load user");
        res.end();
      }
    });
  });
}; //end of exports
