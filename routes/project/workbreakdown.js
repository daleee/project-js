var mongoose = require('mongoose'),
  WorkBreakdownItem = mongoose.model('WorkBreakdownItem');

module.exports = function(app) {
  var prefix = app.get('apiPrefix');
  
  // GET /project/:project/workbreakdown: get a project's WBS
  app.get(prefix + '/projects/:project/workbreakdown', function(req, res) {
    var project = req.project;
    res.send(project.workBreakdownStructure);
  });

  function addChildren(req, res, next) {
    var project = req.project;
    var wbi = req.workbreakdownitem;
    var children = req.body.children;
    if(!children){
      res.send(400, 'Requires child IDs');
      res.end();
    }
    wbi.children = [];
    // synchronous save to make sure children are
    // cleared out of WBI array
    project.save(function(err){
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
  }

  // POST /projects/:project/workbreakdown: create a new parent work breakdown item
  // or update an existing one if there
  app.post(prefix + "/projects/:project/workbreakdown", function(req, res, next) {
    if (!(req.body.title)) {
      res.send(404, 'Title is required');
      res.end();
    }
    var project = req.project;
    if (req.body._id){
      //We already have an ID so we don't need to make a new item. Just get the existing one.
      //DALE: Can you, using req.body._id, get the workbreakdownitem and put it in req.workbreakdownitem?
      WorkBreakdownItem.findById(req.body._id, function(err, wbi) {
        if(err) {
          res.send(500, err);
          res.end();
        }
        req.workbreakdownitem = wbi;
        addChildren(req, res, next);
      })

    }else{
      var item = new WorkBreakdownItem();
      item.title = req.body.title;
      item.description = req.body.description;
      item.children = [];
      item.status = 'open';
      item.lastModifiedDate = new Date();
      //lastModifiedBy:

      if (req.body.children) {
        console.log("Children found during new workbreakdownitem creation");
        for (var i = 0; i < req.body.children.length; i++) {
          var child = req.body.children[i]._id || req.body.children[i];
          item.children.push(child);
        }
      }
      project.workBreakdownStructure.push(item);
      project.save(function(err) {
        if (err) {
          res.send(500, err);
          res.end();
        }
        res.json(item);
        res.end();
      });
    }
  });

  // GET /projects/:project/workbreakdown/:workbreakdown: get a specific WorkBreakdownItem
  app.get(prefix + '/projects/:project/workbreakdown/:workbreakdownitem', function(req, res, next) {
    res.json(req.workbreakdownitem);
    res.end();
  });

  // POST /projects/:project/workbreakdown/move: move a workbreakdownitem around within the WBS
  app.post(prefix + '/projects/:project/workbreakdown/move', function(req, res, next){
    var project = req.project;
    var source = req.body.source;
    var appendAfter = req.body.appendAfter;
    if(!(source && appendAfter)) {
      res.send(400, 'source and appendAfter arguments required to move workbreakdown items.');
      res.end();
    }
    var sourceObj = project.workBreakdownStructure.id(source._id || source);
    var appendObj = project.workBreakdownStructure.id(appendAfter._id || source);
    var sourceIdx = project.workBreakdownStructure.indexOf(sourceObj);
    var appendIdx = project.workBreakdownStructure.indexOf(appendObj);

    if(sourceIdx === -1 || appendIdx === -1) {
      res.send(400, 'Could not find source or appendAfter IDs');
      res.end();
    }
    var wbi = project.workBreakdownStructure.splice(sourceIdx, 1);
    project.workBreakdownStructure.splice(appendIdx + 1, 0, wbi[0]);
    project.save(function(err){
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.json(project.workBreakdownStructure);
      res.end();
    });
  });

  // POST /projects/:project/workbreakdown/:workbreakdown: add a new child to workbreakdownitem
  app.post(prefix + '/projects/:project/workbreakdown/:workbreakdownitem', addChildren);

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
