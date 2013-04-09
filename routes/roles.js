// Role Routes
// Project.JS
var mongoose = require('mongoose'),
  Role = mongoose.model('Role'),
  passport = require('passport');

module.exports = function(app) {
  var prefix = app.get('apiPrefix');
  // GET /role: get all roles
  app.get(prefix + "/roles", function(req, res) {
    Role.find({}, function(err, roles) {
     if(err) {
       res.send(500, err);
     }
     res.json(roles);
    });
  });

  // GET /role/:role: get specific roles
  app.get(prefix + "/roles/:role", function(req, res) {
    res.json(req.role);
  });

  // POST /role: create a new role
  // parameters:
  // title: Role name
  // permissions: an Array of Permission objects:
  // (eg: [{"title": "canEat"}, {"title": "canSleep"}]
  app.post(prefix + "/roles", function(req, res, next) {
    if(!(req.body.title)){
        res.send(500);
      }

    var newrole = new Role({title: req.body.title});

    // if permissions were included, add them
    if(req.body.permissions){
      var permissions = req.body.permissions;
      for (var i = 0; i < permissions.length; i += 1) {
        newrole.permissions.push(permissions[i]);
      }
    }

    newrole.save(function(err){
      if(err) {
        res.send(500, err);
      }
      res.json(newrole);
    });
  });

  // POST /role/:role: add new permissions to role
  app.post(prefix + "/roles/:role", function(req, res, next) {
    if(!req.role) {
      res.send(500);
    }

    var role = req.role;
    var permissionObj = JSON.parse(req.body.permissions);
    for (var i = 0; i < permissionObj.length; i += 1) {
      var perm = new Permission(permissionObj[i]);
      role.permissions.push(perm);
    }
    role.save();
    res.send(200, role);
  });

  // POST /role/:role: update role information
  app.put(prefix + "/roles/:role", function(req, res) {
    if(!req.role) {
      res.send(500);
    }
    var role = req.role;
    if(req.body.title) role.title = req.body.title;
    role.save();
    res.send(role);
  });

  // DELETE /role/:role delete a role
  // if a param 'permission' is given with
  // a permission id, only that permission
  // is deleted from the role
  app.delete(prefix + "/roles/:role", function(req, res) {
    // if permissions to delete were sent,
    // only delete those...
    if(req.body.permissions) {
      var permiss = JSON.parse(req.body.permissions);
      var role = req.role[0];
      for (var i = 0; i < permiss.length; i += 1) {
        var doc = role.permissions.id(permiss[i]).remove();
      }
      role.save(function(err) {
        if(err) {
          res.send(500, err);
        }
        res.send(200, role);
      });
    } // end if (req.body.permissions)
    // ... otherwise, delete the
    // entire role
    else {
      Role.remove({_id: req.role[0]._id}, function(err){
        if(err){
          res.send(500);
        }
        else {
          res.send(200);
        }
      });
    }
  });

  // :role parameter route: finds a role &
  // passes it to next route, handles errors
  app.param('role', function(req, res, next, id){
    Role.find({_id : id}, function(err, role){
      if (err) {
        res.send(500, "Error while finding role");
      } else if (role) {
        // Hack, find out why it's an array?!
        if (role instanceof Array && role.length === 1) {
          role = role[0];
        }
        req.role = role;
        next();
      } else {
        res.send(500, "Error while finding role");
      }
    });
  });
}; //end of exports
