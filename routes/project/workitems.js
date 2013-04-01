var mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  User = mongoose.model('User'),
  Role = mongoose.model('Role'),
  passport = require('passport'),
  Utilities = require('../../utilities');

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
      res.end();
    }
  });

  // POST /project/:project/workitem: create a project's work items
  app.post(prefix + '/projects/:project/workitems', function(req, res) {
    var project = req.project;
    if (!(req.body.title
         && req.body.description
         && req.body.timeEstimate)) {
           res.send(500, 'Not enough data to create a new work item');
           res.end();
    }

    var wi = {};
    // add attributes
    wi.title = req.body.title;
    wi.description = req.body.description;
    wi.timeEstimate = req.body.timeEstimate;
    wi.startDate = new Date();
    project.workItems.push(wi);
    project.save(function(err){
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.send(wi);
      res.end();
    });
  });

  // PUT /project/:project/workitem: update a project's work items
  app.put(prefix + '/projects/:project/workitems/:workitem', function(req, res) {
    var project = req.project;
    var wi = req.workItem;

    // update attributes
    if(req.body.title) wi.title = req.body.title;
    if(req.body.description) wi.description = req.body.description;
    if(req.body.timeEstimate) wi.timeEstimate = req.body.timeEstimate;
    if(req.body.status) wi.status = req.body.status;
    if(req.body.completionPercentage) wi.completionPercentage = req.body.completionPercentage;

    // add dependencies
    if(req.body.dependencies){
      for (var i = 0, l = req.body.dependencies.length; i < l; i ++) {
        var v = req.body.dependencies[i];
        wi.dependencies.push(ObjectId(v));
      }
    }

    project.save(function(err){
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.send(wi);
      res.end();
    });
  });

  // GET /project/:project/workitem/:workitem: get a project's specific work items
  app.get(prefix + '/projects/:project/workitems/:workitem', function(req, res) {
    res.send(req.workItem);
  });
};