var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Role = mongoose.model('Role');

module.exports = function(app) {
  var prefix = app.get('apiPrefix');
  
  // GET /project/:project/user: get all users in project
  app.get(prefix + "/projects/:project/users", function(req, res, next){
    res.send(req.project.projectUsers);
    res.end();
  });

  // :project parameter route: finds a project &
  // passes it to next route, handles errors
  app.param('projectUser', function(req, res, next, id){
    User.findOne({"_id": id}, function(err, user){
      if (err){
        res.send(500, "Server error");
        res.end();
      } else if (user){
        var userInProject = req.project.hasUserAndRetrieve(id);
        if (!userInProject) {
          res.send(404, "User does not exist within project");
          res.end();
        }
        req.projectUser = userInProject;
        next();
      } else{
        res.send(500, "Server error");
        res.end();
      }
    });
  });

  // POST /project/:project/user: adds user to project
  app.post(prefix + "/projects/:project/users", function(req, res,next) {
    if(!req.body.userId){
      res.send(500, "Not enough information");
      res.end();
    }
    //TODO: make sure user isn't already in project
    User.findOne({"_id": req.body.userId}, function(err, user) {
      if (err) {
        res.send(500, "Server error");
        res.end();
      } else if (user) {
        Role.findOne({"_id": req.body.roleId}, function(err, role) {
          if (err) {
            res.send(500, "Server error");
            res.end();
          } else if (role) {
            var projUser = {};
            projUser.user = user;
            projUser.role = role;
            req.project.projectUsers.push(projUser);
            req.project.save();
            res.send(200, projUser);
            res.end();
          }
        });
      } else {
        res.send(500, "Server error");
        res.end();
      }
    });
  });

  // POST /project/:project/user: updates user within project
  app.post(prefix + "/projects/:project/users/:projectUser", function(req, res, next) {
    if(!req.body.roleId){
      res.send(500, "Not enough information to make query (requires roleId)");
      res.end();
    }
    if (req.projectUser) {
      Role.findOne({"_id": req.body.roleId}, function(err, role) {
        if (err) {
          res.send(500, "Server error");
          res.end();
        } else if (role) {
          req.projectUser.role = req.body.role;
          // save main document
          req.project.save();
          res.send(200, req.projectUser);
          res.end();
        } else {
          res.send(500, "Server error");
          res.end();
        }
      })
    }
  });

  // DELETE /project/:project/user: removes user from project
  app.delete(prefix + "/projects/:project/users/:projectUser", function(req, res, next) {
    if (req.projectUser) {
      var index = req.project.projectUsers.indexOf(req.projectUser);
      if (index === -1) {
        res.send(404, "User does not exist within project");
        res.end();
      }
      // remove user by splicing it out of users array
      req.project.projectUsers.splice(index, 1);
      req.project.save();
      res.send(200, req.projectUser);
      res.end();
    }
  });
};