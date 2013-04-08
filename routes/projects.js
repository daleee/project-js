// Project Routes
// Project.JS
var mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  User = mongoose.model('User'),
  Role = mongoose.model('Role'),
  passport = require('passport'),
  Utilities = require('../utilities');

var populateProjectList = [
  'workItems.lastModifiedBy',
  'workItems.assignedUsers',
  'workItems.comments.postedBy',
  'workPackages.lastModifiedBy',
  'workBreakdownItems.lastModifiedBy',
  'milestones.lastModifiedBy',
  'projectUsers.user',
  'projectUsers.role'
].join(' ');

module.exports = function(app) {
  var prefix = app.get('apiPrefix');

  // GET /project: get all projects
  app.get(prefix + "/projects", function(req, res) {
    Project.find({}).populate(populateProjectList).exec(function(err, projects) {
      if(err) {
        res.send(500, err);
      }
      res.json(req.query.list ? Utilities.lightList(projects) : projects);
    });
  });

  // GET /project/:project: get specific project
  app.get(prefix + "/projects/:project", function(req, res) {
    res.json(req.project);
  });

  // POST /project/:project: update specified project
  app.post(prefix + "/projects/:project", function(req, res) {
    var project = req.project;
    if (req.body.title) project.title = req.body.title;
    if (req.body.clientName) project.clientName = req.body.clientName;
    if (req.body.projectDueDate) project.projectDueDate = req.body.projectDueDate;
    if (req.body.completionPercentage) project.completionPercentage = req.body.completionPercentage;
    if (req.body.status) project.status = req.body.status;

    project.save(function(err){
      if(err) {
        res.send(500, err);
      }
      res.send(200, project);
    });
  });

  // POST /project: create a new project
  app.post(prefix + "/projects", function(req, res, next) {
    if(!req.body.title){
      res.send(404, 'Not enough data to create a project');
    }

    var newproject = new Project();
    newproject.title = req.body.title;
    newproject.description = req.body.description;
    newproject.clientName = req.body.clientName;
    newproject.projectDueDate = req.body.projectDueDate ? req.body.projectDueDate : null;
    newproject.status = 'open';

    newproject.save(function(err){
      if(err) {
        res.send(500, err);
      }
      res.json(newproject);
    });
  });

  // POST /project/:project/close: close a project
  app.post(prefix + "/projects/:project/close", function(req, res) {
    var project = req.project;
    project.status = 'closed';
    project.save(function(err) {
      if(err) {
        res.send(500, err);
      }
      res.json(project);
    });
  });

  // POST /project/:project/open: open a project
  app.post(prefix + "/projects/:project/open", function(req, res) {
    var project = req.project;
    project.status = 'open';
    project.save(function(err) {
      if(err) {
        res.send(500, err);
      }
      res.json(project);
    });
  });

  // :project parameter route: finds a project &
  // passes it to next route, handles errors
  app.param('project', function(req, res, next, id){
    Project.findOne({"_id" : id}).populate(populateProjectList).exec(function(err, project){
      if (err) {
        res.send(500, "Error while finding project");
      } else if (project) {
        req.project = project;
        next();
      } else {
        res.send(500, "Error while finding project");
      }
    });
  });
};
