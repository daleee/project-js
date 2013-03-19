// Project Routes
// Project.JS
var mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  User = mongoose.model('User'),
  passport = require('passport');

module.exports = function(app) {
  var prefix = app.get('apiPrefix');
  // GET /project: get all projects
  app.get(prefix + "/project", function(req, res) {
    Project.find({}).exec(function(err, projects) {
      if(err) {
        res.send(500);
        res.end('Something bad happened');
      }
      res.json(projects);
    });
  });

  // GET /project/:project: get specific project
  app.get(prefix + "/project/:project", function(req, res) {
    res.json(req.project);
  });

  // PUT /project/:project: update specified project
  app.put(prefix + "/project/:project", function(req, res) {
    var project = req.project;
    if (req.body.title) project.title = req.body.title;
    if (req.body.clientName) project.clientName = req.body.clientName;
    if (req.body.projectDueDate) project.projectDueDate = req.body.projectDueDate;
    if (req.body.completionPercentage) project.completionPercentage = req.body.completionPercentage;

    project.save(function(err){
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.send(200, project);
      res.end();
    });
  });

  // POST /project: create a new project
  app.post(prefix + "/project", function(req, res, next) {
    if(!(req.body.title &&
      req.body.clientName &&
      req.body.projectDueDate)){
        res.send(404, 'Not enough data to create a project');
        res.end();
      }

    var newproject = new Project();
    newproject.title = req.body.title;
    newproject.clientName = req.body.clientName;
    newproject.projectDueDate = new Date(); //TODO: real date
    newproject.status = 'open';

    newproject.save(function(err){
      if(err) {
        res.send(500, err);
        res.end('Something went wrong');
      }
      res.json(newproject);
      res.end();
    });
  });

  // POST /project/:project/close: close a project
  app.post(prefix + "/project/:project/close", function(req, res) {
    var project = req.project;
    project.status = 'closed';
    project.save(function(err) {
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.json(project);
      res.end();
    });
  });

  // POST /project/:project/open: open a project
  app.post(prefix + "/project/:project/open", function(req, res) {
    var project = req.project;
    project.status = 'open';
    project.save(function(err) {
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.json(project);
      res.end();
    });
  });


  // GET /project/:project/user: get all users in project
  app.get(prefix + "/project/:project/user", function(req, res, next){
    res.send(req.project.projectUsers);
    res.end();
  });

  // POST /project/:project/user: adds user to project
  app.post(prefix + "/project/:project/user", function(req, res,next) {
    if(!req.body.userId){
      res.send(500, "Not enough information");
      res.end();
    }
    //TODO: make sure user isn't already in project
    User.findOne({"_id": req.body.userId}, function(err, user){
      if (err){
        res.send(500, "Server error");
        res.end();
      } else if (user){
        var projUser = {};
        projUser.user = user._id;
        //TODO: add role
        req.project.projectUsers.push(projUser);
        req.project.save();
        res.send(200, req.project);
        res.end();
      } else{
        res.send(500, "Server error");
        res.end();
      }
    });
  });

  // PUT /project/:project/user: updates user within project
  app.put(prefix + "/project/:project/user", function(req, res,next) {
    if(!req.body.userId || !req.body.roleId){
      res.send(500, "Not enough information to make query (requires userId and roleId)");
      res.end();
    }
    User.findOne({"_id": req.body.userId}, function(err, user){
      if (err){
        res.send(500, "Server error");
        res.end();
      } else if (user){
        var userInProject = req.project.hasUserAndRetrieve(req.body.userId);
        if (!userInProject) {
          res.send(404, "User does not exist within project");
          res.end();
        }
        // update user's role
        // XXX: todo

        // save main document
        req.project.save();
        res.send(200, req.project);
        res.end();
      } else{
        res.send(500, "Server error");
        res.end();
      }
    });
  });

  // DELETE /project/:project/user: removes user from project
  app.delete(prefix + "/project/:project/user", function(req, res,next) {
    if(!req.body.userId){
      res.send(500, "Not enough information");
      res.end();
    }
    User.findOne({"_id": req.body.userId}, function(err, user){
      if (err){
        res.send(500, "Server error");
        res.end();
      } else if (user){
        var index = req.project.hasUserAndRetrieveIndex(req.body.userId);
        if (!index) {
          res.send(404, "User does not exist within project");
          res.end();
        }
        // remove user by splicing it out of users array
        req.project.projectUsers.splice(index, 1);
        req.project.save();
        res.send(200, req.project);
        res.end();
      } else{
        res.send(500, "Server error");
        res.end();
      }
    });
  });

  // :project parameter route: finds a project &
  // passes it to next route, handles errors
  app.param('project', function(req, res, next, id){
    Project.findOne({"_id" : id})/*.populate('projectUsers.user')*/.exec(function(err, project){
      if (err) {
        res.send(500, "Error while finding project");
        res.end();
      } else if (project) {
        req.project = project;
        next();
      } else {
        res.send(500, "Error while finding project");
        res.end();
      }
    });
  }); // app.param('project')

  // :milestone parameter route: finds a milestone &
  // passes it to next route, handles errors
  app.param('milestone', function(req, res, next, id){
    var project = req.project;
    var ms = project.hasMilestoneAndRetrieve(id);
    if(ms){
      req.ms = ms;
      next();
    }
    else {
      res.send(404, 'Milestone not found');
      res.end();
    }
  }); // app.param('milestone')

  // :milestone parameter route: finds a milestone &
  // passes it to next route, handles errors
  app.param('workpackage', function(req, res, next, id){
    var project = req.project;
    var wp = project.hasWorkPackageAndRetrieve(id);
    if(wp){
      req.wp = wp;
      next();
    }
    else {
      res.send(404, 'Work Package not found');
      res.end();
    }
  }); // app.param('workpackage')

  // :workitem parameter route: finds a work item &
  // passes it to next route, handles errors
  app.param('workitem', function(req, res, next, id){
    var project = req.project;
    var wi = project.hasWorkItemAndRetrieve(id);
    if(wi){
      req.wi = wi;
      next();
    }
    else {
      res.send(404, 'Work Item not found');
      res.end();
    }
  }); // app.param('workitem')
  /////////////////////////////////////////////////
  // EXTRA SHIT - NEEDS TO BE MOVED INTO OWN FILES
  /////////////////////////////////////////////////

  // GET /project/:project/milestones: get project milestones
  app.get(prefix + "/project/:project/milestone", function(req, res) {
    res.json(req.project.milestones);
    res.end();
  });

  // POST /project/:project/milestones: create project milestones
  app.post(prefix + "/project/:project/milestone", function(req, res) {
    var project = req.project;
    var milestone = {
      title: req.body.name,
      description: req.body.description,
      msNumber: req.body.msNumber,
      wpDependencies: [],
      msDependencies: [],
      priority: 'high',
      status: 'late',
      completionPercentage: 50
    };
    project.milestones.push(milestone);
    project.save(function(err){
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.json(req.project.milestones);
      res.end();
    });
  });

  // GET /project/:project/milestones/:milestone: get a project's specific milestone
  app.get(prefix + '/project/:project/milestone/:milestone', function(req, res) {
    res.send(req.ms);
  });

  // GET /project/:project/workpackage: get a project's work packages
  app.get(prefix + '/project/:project/workpackage', function(req, res) {
    var project = req.project;
    res.send(project.workPackages);
  });

  // GET /project/:project/workpackages/:workpackage: get a project's specific work package
  app.get(prefix + '/project/:project/workpackages/:workpackage', function(req, res) {
    res.send(req.wp);
  });

  // GET /project/:project/workitem: get a project's work items
  app.get(prefix + '/project/:project/workitems', function(req, res) {
    var project = req.project;
    res.send(project.workItems);
  });

  // GET /project/:project/workitem/:workitem: get a project's specific work items
  app.get(prefix + '/project/:project/workitems/:workitem', function(req, res) {
    res.send(req.wi);
  });

  // GET /project/:project/workbreakdown: get a project's WBS
  app.get(prefix + '/project/:project/workbreakdown', function(req, res) {
    var project = req.project;
    res.send(project.workBreakdownStructure);
  });
}; //end of exports
