var Utilities = require('../../utilities');

module.exports = function(app) {
  var prefix = app.get('apiPrefix');

  // GET /project/:project/milestones: get project milestones
  app.get(prefix + "/projects/:project/milestones", function(req, res) {
    res.send(req.query.list ? Utilities.lightList(req.project.milestones) : req.project.milestones);
    res.end();
  });

  // :milestone parameter route: finds a milestone &
  // passes it to next route, handles errors
  app.param('milestone', function(req, res, next, id){
    var project = req.project;
    var ms = project.hasMilestoneAndRetrieve(id);
    if(ms){
      req.milestone = ms;
      next();
    }
    else {
      res.send(404, 'Milestone not found');
      res.end();
    }
  });

  // POST /project/:project/milestones: create project milestones
  app.post(prefix + "/projects/:project/milestones", function(req, res) {
    var project = req.project;
    var milestone = {
      title: req.body.title,
      description: req.body.description,
      completionPercentage: req.body.completionPercentage || 0,
      wpDependencies: [],
      msDependencies: [],
      priority: 'high',
      status: 'open'
    };

    // add dependencies
    if(req.body.wpDependencies){
      for (var i = 0, l = req.body.wpDependencies.length; i < l; i ++) {
        var v = req.body.wpDependencies[i];
        v.wkpackage = ObjectId(v.wkpackage);
        milestone.wpDependencies.push(v);
      }
    }

    if(req.body.msDependencies){
      for (var i = 0, l = req.body.msDependencies.length; i < l; i ++) {
        var v = req.body.msDependencies[i];
        milestone.msDependencies.push(ObjectId(v));
      }
    }

    project.milestones.push(milestone);
    project.save(function(err){
      if(err) {
        console.log(err);
        res.send(500, err);
        res.end();
      }
      res.json(req.project.milestones);
      res.end();
    });
  });

  // POST /project/:project/workpackage: update a project's work packages
  app.post(prefix + '/projects/:project/workpackages/:workpackage', function(req, res) {
    var project = req.project;
    var ms = req.milestone;

    // update attributes
    if(req.body.title) ms.title = req.body.title;
    if(req.body.description) ms.description = req.body.description;
    if(req.body.status) ms.status = req.body.status;
    if(req.body.completionPercentage) ms.completionPercentage = req.body.completionPercentage;

    // add dependencies
    if(req.body.wpDependencies){
      for (var i = 0, l = req.body.wpDependencies.length; i < l; i ++) {
        var v = req.body.wpDependencies[i];
        v.wkpackage = ObjectId(v.wkpackage);
        ms.wpDependencies.push(v);
      }
    }

    if(req.body.msDependencies){
      for (var i = 0, l = req.body.msDependencies.length; i < l; i ++) {
        var v = req.body.msDependencies[i];
        ms.msDependencies.push(ObjectId(v));
      }
    }

    project.save(function(err){
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.send(ms);
      res.end();
    });
  });

  // GET /project/:project/milestones/:milestone: get a project's specific milestone
  app.get(prefix + '/projects/:project/milestones/:milestone', function(req, res) {
    res.send(req.milestone);
  });
};