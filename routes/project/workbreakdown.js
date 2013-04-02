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
        var child = req.body.children[i]._id || req.body.children[i];
        item.children.push(child);
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
    var children = req.body.children;
    if(!children){
      res.send(400, 'Requires child IDs');
      res.end();
    }
    children = JSON.parse(children);
    for (var i = 0, l = children.length; i < l; i ++) {
      var id = children[i]._id || children[i];
      wbi.children.push(id);
    }
    project.save(function(err) {
      if (err) {
        res.send(500, err);
        res.end()
      }
      res.json(wbi);
      res.end();
    });
  });

  // DELETE /projects/:project/workbreakdown/:workbreakdown: delete a workbreakdownitem child
  app.delete(prefix + '/projects/:project/workbreakdown/:workbreakdownitem', function(req, res, next) {
    var project = req.project;
    var wbi = req.workbreakdownitem;
    var children = req.body.children;
    if(!children){
      res.send(400, 'Requires child IDs');
      res.end();
    }
    children = JSON.parse(children);
    for (var i = 0, l = children.length; i < l; i ++) {
      var id = children[i]._id || children[i];
      var idx = wbi.children.indexOf(id);
      if(idx !== -1) {
        wbi.children.splice(idx, 1);
      }
    }
    project.save(function(err) {
      if (err) {
        res.send(500, err);
        res.end()
      }
      res.json(wbi);
      res.end();
    });
  });
  // PUT /projects/:project/workbreakdown/:workbreakdown: update a workbreakdownitem
  app.put(prefix + '/projects/:project/workbreakdown/:workbreakdownitem', function(req, res, next) {
    var project = req.project;
    var wbi = req.workbreakdownitem;
    if(req.body.title) wbi.title = req.body.title;
    if(req.body.description) wbi.description = req.body.description;
    if(req.body.status) {
      var status = req.body.status;
      if (status === 'open'
         || status === 'closed'
         || status === 'late'
         || status === 'deleted') {
        wbi.status = req.body.status;
      }
    }
    wbi.lastModifiedDate = new Date();
    //TODO: add user ID to lastModifiedBy
    // wbi.lastModifiedBy = req.body.user._id || req.body.user;
    project.save(function(err) {
      if (err) {
        res.send(500, err);
        res.end()
      }
      res.json(wbi);
      res.end();
    });
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
