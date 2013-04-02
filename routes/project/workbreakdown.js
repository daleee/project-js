module.exports = function(app) {
  var prefix = app.get('apiPrefix');
  
  // GET /project/:project/workbreakdown: get a project's WBS
  app.get(prefix + '/projects/:project/workbreakdown', function(req, res) {
    var project = req.project;
    res.send(project.workBreakdownStructure);
  });
  
  // POST /projects/:project/workbreakdown: create a new parent work breakdown item
  app.post(prefix + "/projects/:project/workbreakdown", function(req, res, next) {
    if (!(req.body.title)) {
      res.send(404, 'Title is required');
      res.end();
    }
    var project = req.project;
    var item = {
      title: req.body.title,
      description: req.body.description,
      children: [],
      status: 'open',
      lastModifiedDate: new Date(),
      //lastModifiedBy: 
    };
    if (req.body.children) {
      for (var i = 0; i < req.body.children.lengh; i++) {
        item.children.push(req.body.children[i]);
      }
    }
    project.workBreakdownStructure.push(item);
    project.save(function(err) {
      if (err) {
        res.send(500, err);
        res.end()
      }
      res.json(item);
      res.end();
    });
  });

  // GET /projects/:project/workbreakdown/:workbreakdown: get a specific WorkBreakdownItem
  app.get(prefix + '/projects/:project/workbreakdown/:workbreakdownitem', function(req, res, next) {
    res.json(req.workbreakdownitem);
    res.end();
  });

  // POST /projects/:project/workbreakdown/:workbreakdown: add a new child to workbreakdownitem
  app.post(prefix + '/projects/:project/workbreakdown/:workbreakdownitem', function(req, res, next) {
    var project = req.project;
    var wbi = req.workbreakdownitem;
  });

  // PUT /projects/:project/workbreakdown/:workbreakdown: update a workbreakdownitem
  app.put(prefix + '/projects/:project/workbreakdown/:workbreakdownitem', function(req, res, next) {
    var project = req.project;
    var wbi = req.workbreakdownitem;
    if(!req.body.children) {
      res.send(404, 'Request must include array of children IDs');
      res.end();
    }
  });

  // 'workbreakdownitem' param catcher
  app.param('workbreakdownitem', function(req, res, next, id) {
    var project = req.project;
    var workbreakdownitem = project.workBreakdownStructure.id(id);
    if(workbreakdownitem) {
      req.workbreakdownitem = workbreakdownitem;
      next();
    }
    else {
      res.send(404, 'Cannot find that work breakdown item');
      res.end();
    }
  });
};
