// require necessary modules, start express app
var express = require("express");
var app = express();
var dummyDB = require('./dummydb');
var MemoryStore = express.session.MemoryStore;
var fs = require('fs');
// configuration
var port = 2999;

app.use(express.cookieParser());
app.use(express.session({
  store: new MemoryStore(), 
  secret: 'thisisagreatsecretdontyouthink'
}));
app.use(express.static(__dirname + '/app'));
app.use(app.router);

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/app/index.html', 'utf8', function(err, text){
    res.send(text);
  });
});

app.get('/api/user', function(req, res) {
  res.send(dummyDB.users);
});

app.get('/api/user/:userId', function(req, res) {
  res.send(findInArray(dummyDB.users, req.params.userId));
});

app.get('/api/login', function(req, res) {
  if (req.session.user) {
    res.send(req.session.user);
  }
});

app.post('/api/login', function(req, res) {
  var user = findInArray(dummyDB.users, req.query.username);
  if (user && user.password !== req.query.password) {
    user = null;
  }
  if (user) {
    res.send(user);
    req.session.user = user;
  }
});

app.get('/api/logout', function(req, res) {
  req.session.user = null;
  res.send(null);
});

app.get('/api/role', function(req, res) {
  res.send(dummyDB.roles);
});

app.get('/api/role/:roleId', function(req, res) {
  res.send(findInArray(dummyDB.roles, req.params.roleId));
});

app.get('/api/project', function(req, res) {
  res.send(dummyDB.projects);
});

app.get('/api/project/:projectId', function(req, res) {
  res.send(findInArray(dummyDB.projects, req.params.projectId));
});

app.get('/api/project/:projectId/milestone', function(req, res) {
  var project = findInArray(dummyDB.projects, req.params.projectId);
  res.send(project.milestones);
});

app.post('/api/project/:projectId/milestone', function(req, res) {
  var project = findInArray(dummyDB.projects, req.params.projectId);
  project.milestones.push({
    _id: req.query.name,
    title: req.query.name,
    description: req.query.description,
    lastModifiedDate: new Date(),
    wpDependencies: [],
    msDependencies: [],
    priority: 'high',
    status: 'late',
    completionPercentage: 50
  });
});

app.get('/api/project/:projectId/milestone/:milestoneId', function(req, res) {
  var project = findInArray(dummyDB.projects, req.params.projectId);
  res.send(findInArray(project.milestones, req.params.milestoneId));
});

app.get('/api/project/:projectId/workpackage', function(req, res) {
  var project = findInArray(dummyDB.projects, req.params.projectId);
  res.send(project.workPackages);
});

app.get('/api/project/:projectId/workpackage/:workPackageId', function(req, res) {
  var project = findInArray(dummyDB.projects, req.params.projectId);
  res.send(findInArray(project.workPackages, req.params.workPackageId));
});

app.get('/api/project/:projectId/workitem', function(req, res) {
  var project = findInArray(dummyDB.projects, req.params.projectId);
  res.send(project.workItems);
});

app.get('/api/project/:projectId/workbreakdown', function(req, res) {
  var project = findInArray(dummyDB.projects, req.params.projectId);
  res.send(project.workBreakdownStructure);
});

app.get('/api/project/:projectId/workitem/:workItemId', function(req, res) {
  var project = findInArray(dummyDB.projects, req.params.projectId);
  res.send(findInArray(project.workItems, req.params.workItemId));
});

var findInArray = function(arr, id, findBy) {
  findBy = findBy || '_id';
  var current = null;
  if (arr) {
    for (var i=0; i<arr.length && !current; ++i) {
      var obj = arr[i];
      if (obj[findBy].toLowerCase() === id.toLowerCase()) {
        current = obj;
      }
    }
  }
  return current;
};

// start application
app.listen(port);
console.log("Listening on port: " + port);