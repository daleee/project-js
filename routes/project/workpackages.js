var Utilities = require('../../utilities');

module.exports = function(app) {
  var prefix = app.get('apiPrefix');
  
  // GET /project/:project/workpackage: get a project's work packages
  app.get(prefix + '/projects/:project/workpackages', function(req, res) {
    var project = req.project;
    res.send(req.query.list ? Utilities.lightList(project.workPackages) : project.workPackages);
  });

  // :workpackage parameter route: finds a workpackage &
  // passes it to next route, handles errors
  app.param('workpackage', function(req, res, next, id){
    var project = req.project;
    var wp = project.hasWorkPackageAndRetrieve(id);
    if(wp){
      req.workPackage = wp;
      next();
    }
    else {
      res.send(404, 'Work Package not found');
      res.end();
    }
  });

  // POST /project/:project/workpackages: create a project's work packages
  app.post(prefix + '/projects/:project/workpackages', function(req, res) {
    var project = req.project;
    if (!(req.body.title && req.body.description)) {
      res.send(500, 'Not enough data to create a new work package');
      res.end();
    }

    var wp = {};
    // add attributes
    wp.title = req.body.title;
    wp.description = req.body.description;
    wp.status = req.body.status || 'open';
    wp.completionPercentage = req.body.completionPercentage || 0;

    // add dependencies
    if(req.body.dependencies) {
      for (var i = 0, l = req.body.dependencies.length; i < l; i ++) {
        var v = req.body.dependencies[i];
        wp.dependencies.push(ObjectId(v));
      }
    }

    project.workPackages.push(wp);
    project.save(function(err){
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.send(wp);
      res.end();
    });
  });

  // POST /project/:project/workpackage: update a project's work packages
  app.post(prefix + '/projects/:project/workpackages/:workpackage', function(req, res) {
    var project = req.project;
    var wp = req.workPackage;

    // update attributes
    if(req.body.title) wp.title = req.body.title;
    if(req.body.description) wp.description = req.body.description;
    if(req.body.status) wp.status = req.body.status;
    if(req.body.completionPercentage) wp.completionPercentage = req.body.completionPercentage;

    // add dependencies
    if(req.body.dependencies){
      for (var i = 0, l = req.body.dependencies.length; i < l; i ++) {
        var v = req.body.dependencies[i];
        wp.dependencies.push(ObjectId(v));
      }
    }

    project.save(function(err){
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.send(wp);
      res.end();
    });
  });

  // GET /project/:project/workpackages/:workpackage: get a project's specific work package
  app.get(prefix + '/projects/:project/workpackages/:workpackage', function(req, res) {
    res.send(req.workPackage);
  });
};