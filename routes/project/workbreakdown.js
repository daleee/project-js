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
};