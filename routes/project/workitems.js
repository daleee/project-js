var mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  User = mongoose.model('User'),
  Role = mongoose.model('Role'),
  WorkItem = mongoose.model("WorkItem"),
  passport = require('passport'),
  Utilities = require('../../utilities'),
  ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = function(app) {
  var prefix = app.get('apiPrefix');

  // GET /project/:project/workitem: get a project's work items
  app.get(prefix + '/projects/:project/workitems', function(req, res) {
    var project = req.project;
    res.send(req.query.list ? Utilities.lightList(project.workItems) : project.workItems);
  });

  // :workitem parameter route: finds a work item &
  // passes it to next route, handles errors
  app.param('workitem', function(req, res, next, id){
    var project = req.project;
    var wi = project.hasWorkItemAndRetrieve(id);
    if(wi){
      req.workItem = wi;
      next();
    }
    else {
      res.send(404, 'Work Item not found');
    }
  });

  // POST /project/:project/workitem: create a project's work items
  app.post(prefix + '/projects/:project/workitems', function(req, res) {
    var project = req.project;
    if (!(req.body.title)) {
           res.send(500, 'Not enough data to create a new work item');
    }

    var wi = new WorkItem();
    // add attributes
    wi.title = req.body.title;
    wi.description = req.body.description;
    wi.timeEstimate = req.body.timeEstimate || 0;
    wi.timeSpent = req.body.timeSpent || 0;
    wi.startDate = new Date();
    wi.status = req.body.status || 'open';
    wi.ownCompletionPercentage = req.body.ownCompletionPercentage || 0;
    wi.dependencies = [];
    wi.workPackages = [];
    wi.assignedUsers = [];
    wi.comments = [];

    // add dependencies
    if(req.body.dependencies){
      for (var i = 0, l = req.body.dependencies.length; i < l; i ++) {
        var v = req.body.dependencies[i];
        if (v) wi.dependencies.push(v._id || v);
      }
    }

    if(req.body.workPackages){
      for (var i = 0, l = req.body.workPackages.length; i < l; i ++) {
        var v = req.body.workPackages[i];
        if (v) wi.workPackages.push(v._id || v);
      }
    }

    if(req.body.assignedUsers){
      for (var i = 0, l = req.body.assignedUsers.length; i < l; i ++) {
        var v = req.body.assignedUsers[i];
        if (v) wi.assignedUsers.push(v._id || v);
      }
    }

    if(req.body.comments){
      for (var i = 0, l = req.body.comments.length; i < l; i ++) {
        var v = req.body.comments[i];
        if (v) wi.comments.push(v);
      }
    }

    project.workItems.push(wi);
    project.save(function(err){
      if(err) {
        console.log(err);
        res.send(500, err);
      }
      res.send(wi);
    });
  });

  // POST /project/:project/workitem: update a project's work items
  app.post(prefix + '/projects/:project/workitems/:workitem', function(req, res) {
    var project = req.project;
    var wi = req.workItem;

    // update attributes
    if(req.body.title) wi.title = req.body.title;
    if(req.body.description) wi.description = req.body.description;
    if(req.body.timeEstimate !== undefined) wi.timeEstimate = req.body.timeEstimate;
    if(req.body.timeSpent !== undefined) wi.timeSpent = req.body.timeSpent;
    if(req.body.status) wi.status = req.body.status;
    if(req.body.ownCompletionPercentage !== undefined) wi.ownCompletionPercentage = req.body.ownCompletionPercentage;

    // add dependencies
    if(req.body.dependencies){
      wi.dependencies = [];
      for (var i = 0, l = req.body.dependencies.length; i < l; i ++) {
        var v = req.body.dependencies[i];
        if (v) wi.dependencies.push(v._id || v);
      }
    }

    if(req.body.workPackages){
      wi.workPackages = [];
      for (var i = 0, l = req.body.workPackages.length; i < l; i ++) {
        var v = req.body.workPackages[i];
        if (v) wi.workPackages.push(v._id || v);
      }
    }

    if(req.body.assignedUsers){
      wi.assignedUsers = [];
      for (var i = 0, l = req.body.assignedUsers.length; i < l; i ++) {
        var v = req.body.assignedUsers[i];
        if (v) wi.assignedUsers.push(v._id || v);
      }
    }

    if(req.body.comments){
      wi.comments = [];
      for (var i = 0, l = req.body.comments.length; i < l; i ++) {
        var v = req.body.comments[i];
        if (v) wi.comments.push(v);
      }
    }

    project.save(function(err){
      if(err) {
        res.send(500, err);
      }
      res.send(wi);
    });
  });

  // GET /project/:project/workitem/:workitem: get a project's specific work items
  app.get(prefix + '/projects/:project/workitems/:workitem', function(req, res) {
    res.send(req.workItem);
  });
};
