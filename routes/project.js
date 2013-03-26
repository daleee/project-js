// Project Routes
// Project.JS
var mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  User = mongoose.model('User'),
  passport = require('passport');

module.exports = function(app) {
  var prefix = app.get('apiPrefix');
  // GET /project: get all projects
  app.get(prefix + "/project", function(req, res) {
    Project.find({}).exec(function(err, projects) {
      if(err) {
        res.send(500);
        res.end('Something bad happened');
      }
      res.json(projects);
    });
  });

  // GET /project/:project: get specific project
  app.get(prefix + "/project/:project", function(req, res) {
    res.json(req.project);
  });

  // PUT /project/:project: update specified project
  app.put(prefix + "/project/:project", function(req, res) {
    var project = req.project;
    if (req.body.title) project.title = req.body.title;
    if (req.body.clientName) project.clientName = req.body.clientName;
    if (req.body.projectDueDate) project.projectDueDate = req.body.projectDueDate;
    if (req.body.completionPercentage) project.completionPercentage = req.body.completionPercentage;

    project.save(function(err){
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.send(200, project);
      res.end();
    });
  });

  // POST /project: create a new project
  app.post(prefix + "/project", function(req, res, next) {
    if(!(req.body.title &&
      req.body.clientName,
      req.body.projectDueDate)){
        res.send(404, 'Not enough data to create a project');
        res.end();
      }

    var newproject = new Project();
    newproject.title = req.body.title;
    newproject.clientName = req.body.clientName;
    newproject.projectDueDate = new Date(); //TODO: real date
    newproject.staus = 'open';

    newproject.save(function(err){
      if(err) {
        res.send(500, err);
        res.end('Something went wrong');
      }
      res.json(newproject);
      res.end();
    });
  });

  // POST /project/:project/close: close a project
  app.post(prefix + "/project/:project/close", function(req, res) {
    var project = req.project;
    project.status = 'closed';
    project.save(function(err) {
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.json(project);
      res.end();
    });
  });

  // POST /project/:project/open: open a project
  app.post(prefix + "/project/:project/open", function(req, res) {
    var project = req.project;
    project.status = 'open';
    project.save(function(err) {
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.json(project);
      res.end();
    });
  });


  // GET /project/:project/user: get all users in project
  app.get(prefix + "/project/:project/user", function(req, res, next){
    res.send(req.project.projectUsers);
    res.end();
  });

  // POST /project/:project/user: adds user to project
  app.post(prefix + "/project/:project/user", function(req, res,next) {
    if(!req.body.userId){
      res.send(500, "Not enough information");
      res.end();
    }
    //TODO: make sure user isn't already in project
    User.findOne({"_id": req.body.userId}, function(err, user){
      if (err){
        res.send(500, "Server error");
        res.end();
      } else if (user){
        var projUser = {};
        projUser.user = user._id;
        //TODO: add role
        req.project.projectUsers.push(projUser);
        req.project.save();
        res.send(200, req.project);
        res.end();
      } else{
        res.send(500, "Server error");
        res.end();
      }
    });
  });

  // PUT /project/:project/user: updates user within project
  app.put(prefix + "/project/:project/user", function(req, res,next) {
    if(!req.body.userId || !req.body.roleId){
      res.send(500, "Not enough information to make query (requires userId and roleId)");
      res.end();
    }
    User.findOne({"_id": req.body.userId}, function(err, user){
      if (err){
        res.send(500, "Server error");
        res.end();
      } else if (user){
        var userInProject = req.project.hasUserAndRetrieve(req.body.userId);
        if (!userInProject) {
          res.send(404, "User does not exist within project");
          res.end();
        }
        // update user's role
        // XXX: todo

        // save main document
        req.project.save();
        res.send(200, req.project);
        res.end();
      } else{
        res.send(500, "Server error");
        res.end();
      }
    });
  });

  // DELETE /project/:project/user: removes user from project
  app.delete(prefix + "/project/:project/user", function(req, res,next) {
    if(!req.body.userId){
      res.send(500, "Not enough information");
      res.end();
    }
    User.findOne({"_id": req.body.userId}, function(err, user){
      if (err){
        res.send(500, "Server error");
        res.end();
      } else if (user){
        var index = req.project.hasUserAndRetrieveIndex(req.body.userId);
        if (!index) {
          res.send(404, "User does not exist within project");
          res.end();
        }
        // remove user by splicing it out of users array
        req.project.projectUsers.splice(index, 1);
        req.project.save();
        res.send(200, req.project);
        res.end();
      } else{
        res.send(500, "Server error");
        res.end();
      }
    });
  });

  // :project parameter route: finds a project &
  // passes it to next route, handles errors
  app.param('project', function(req, res, next, id){
    Project.findOne({"_id" : id}).populate('projectUsers.user').exec(function(err, project){
      if (err) {
        res.send(500, "Error while finding project");
        res.end();
      } else if (project) {
        req.project = project;
        next();
      } else {
        res.send(500, "Error while finding project");
        res.end();
      }
    });
  }); // app.param('project')

  // :milestone parameter route: finds a milestone &
  // passes it to next route, handles errors
  app.param('milestone', function(req, res, next, id){
    var project = req.project;
    var ms = project.hasMilestoneAndRetrieve(id);
    if(ms){
      req.ms = ms;
      next();
    }
    else {
      res.send(404, 'Milestone not found');
      res.end();
    }
  }); // app.param('milestone')

  // :milestone parameter route: finds a milestone &
  // passes it to next route, handles errors
  app.param('workpackage', function(req, res, next, id){
    var project = req.project;
    var wp = project.hasWorkPackageAndRetrieve(id);
    if(wp){
      req.wp = wp;
      next();
    }
    else {
      res.send(404, 'Work Package not found');
      res.end();
    }
  }); // app.param('workpackage')

  // :workitem parameter route: finds a work item &
  // passes it to next route, handles errors
  app.param('workitem', function(req, res, next, id){
    var project = req.project;
    var wi = project.hasWorkItemAndRetrieve(id);
    if(wi){
      req.wi = wi;
      next();
    }
    else {
      res.send(404, 'Work Item not found');
      res.end();
    }
  }); // app.param('workitem')
  /////////////////////////////////////////////////
  // EXTRA SHIT - NEEDS TO BE MOVED INTO OWN FILES
  /////////////////////////////////////////////////

  // GET /project/:project/milestones: get project milestones
  app.get(prefix + "/project/:project/milestones", function(req, res) {
    res.json(req.project.milestones);
    res.end();
  });

  // POST /project/:project/milestones: create project milestones
  app.post(prefix + "/project/:project/milestones", function(req, res) {
    var project = req.project;
    var milestone = {
      title: req.body.name,
      description: req.body.description,
      msNumber: req.body.msNumber,
      wpDependencies: [],
      msDependencies: [],
      priority: 'high',
      status: 'late',
      completionPercentage: 50
    };
    project.milestones.push(milestone);
    project.save(function(err){
      if(err) {
        res.send(500, err);
        res.end();
      }
      res.json(req.project.milestones);
      res.end();
    });
  });

  // GET /project/:project/milestones/:milestone: get a project's specific milestone
  app.get('/project/:project/milestones/:milestone', function(req, res) {
    res.send(req.ms);
  });

  // GET /project/:project/workpackage: get a project's work packages
  app.get('/project/:project/workpackages', function(req, res) {
    var project = req.project;
    res.send(project.workPackages);
  });

  // GET /project/:project/workpackages/:workpackage: get a project's specific work package
  app.get('/project/:project/workpackages/:workpackage', function(req, res) {
    res.send(req.wp);
  });

  // GET /project/:project/workitem: get a project's work items
  app.get('/project/:project/workitem', function(req, res) {
    var project = req.project;
    res.send(project.workItems);
  });

  // GET /project/:project/workitem/:workitem: get a project's specific work items
  app.get('/project/:project/workitem/:workitem', function(req, res) {
    res.send(req.wi);
  });

  // GET /project/:project/workbreakdown: get a project's WBS
  app.get('/project/:project/workbreakdown', function(req, res) {
    var project = req.project;
    res.send(project.workBreakdownStructure);
  });
  
  // POST /projects/:project/workbreakdownitems: create project work breakdown items
  app.post(prefix + "/projects/:project/workbreakdownitems", function(req, res, next) {
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
    if (!(req.body.children.lengh === 0) {
      for (var i = 0; i < req.body.children.lengh; i++) {
        item.children.push(req.body.children[i]);
      }
    }
    project.workBreakdownItems.push(item);
    project.save(function(err) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end()
      }  
    }
    res.json(req.project.item);
    res.end();
  });
}; //end of exports



//////////////////////////////
// JENNIFER'S ORIGINAL CODE //
//////////////////////////////
 
/* Work Breakdown methods */

//addToList adds the newly-created WorkBreakdownItem to the WorkBreakdown 'items' array
WorkBreakdown.methods.addToList = function(id, index, userId) {
  var project = new Project();
  var listing = new WorkBreakdown();
  // add new item to its proper place in the array
  listing.items.splice(index, 0, id);
  listing.lastModifiedDate = new Date();
  listing.lastModifiedBy = userId;
  // mark the work breakdown structure as modified
  project.workBreakdownStructure.markModified(listing);
  project.save(function(err) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end()
    }  
  }
  res.json(req.project.listing);
  res.end();
}; // end WorkBreakdown.addToList

//moveItemInList
WorkBreakdown.methods.moveItemInList = function(id, oldIndex, newIndex, newChildren[], userId) {
  var project = new Project();
  var listing = new WorkBreakdown();
  var item = new WorkBreakdownItem();
  
  // remove list item from old index position
  listing.items.splice(oldIndex, 1);
  // add list item to new index position
  listing.items.splice(newIndex, 0, id);
  
  // retrieve work breakdown item and replace old children with new ones
  project.workBreakdownItems.findById(id, function(err, item) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end();
    }
    if (newChildren) {
      if (!item.children.equal(newChildren)){
        // remove old children
        while (item.children.length > 0) {
          item.children.pop();
        }
        // insert new children	
        for (var i = 0; i < newChildren.length; i++) {
          item.children.push(newChildren[i]);
        }
      }
    }  
    item.lastModifiedDate = new Date();
    item.lastModifiedBy = userId;
    project.workBreakdownItems.markModified(item);
  });
  project.save(function(err) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end()
    }  
  }
  res.json(req.project.item);
  res.end();  
};

//editItem
WorkBreakdownItem.methods.editItem = function(id, newTitle, newDesc, userId) {
  var project = new Project();
  var item = new WorkBreakdownItem();
  
  // retrieve the work breakdown item from the db
  project.workBreakdownItems.findById(id, 'title description lastModifiedDate lastModifiedBy', function(err, item) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end();
    }
    if (newTitle) {
      item.title = newTitle;
    }
    if (newDesc) {
      item.description = newDesc;
    }
	  item.lastModifiedDate = new Date();
	  item.lastModifiedBy = userId;
    project.workBreakdownItems.markModified(item);
  });
  project.save(function(err) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end()
    }  
  }
  res.json(req.project.item);
  res.end();
};

//deleteItem
WorkBreakdownItem.methods.deleteItem = function(id, userId) {
  var project = new Project();
  var item = new WorkBreakdownItem();
  // retrieve item from the db
  project.workBreakdownItems.findById(id, 'status lastModifiedDate lastModifiedBy', function(err, item) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end();
    }
    // change status to deleted
    item.status = 'deleted';
    item.lastModifiedDate = new Date();
    item.lastModifiedBy = userId;
    project.workBreakdownItems.markModified(item);
  });
  project.save(function(err) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end()
    }  
  }
  res.json(req.project.item);
  res.end();
};

// createListAsCopy
WorkBreakdownStructure.methods.copyStructure = function(params) {
  //find out how this would be done
};

/* Milestone methods */

// addToList adds the newly-created milestone to the MilestoneList
// QUESTION: is a milestone always added to the end of the list or can it be added to the middle?
MilestoneListing.methods.addToList = function(id, userId){
  var project = new Project();
  var listing = new MilestoneListing();
  listing.items.push(id);
  listing.lastModifiedDate = new Date();
  listing.lastModifiedBy = userId;
  
  // add new milestone listing to project milestoneList
  project.milestoneList.push(newListing);
  
  //save
  project.save(function(err) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end()
    }  
  }
  res.json(req.project.listing);
  res.end();
}; // end addToList (milestone)

// editMilestone - updates a project milestone with changes user has made
Milestone.methods.editMilestone = function(id, newTitle, newDesc, newPriority, newStatus, wpDep[], msDep[], reqComp[], userId){
  var project = new Project();
  var milestone = new Milestone();
  // retrieve the milestone from the db
  project.milestones.findById(id, function(err, milestone) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end();
    }
    if (newTitle) {
      milestone.title = newTitle;
    }
    if (newDesc) {
      milestone.description = newDesc;
    }
    if (newPriority) {
      milestone.priority = newPriority;
    }
    if (newStatus) {
      milestone.status = newStatus;
    }
    if((wpDep) && (!milestone.wpDependencies.equal(wpDep))) {
      // remove old wpDependencies
      while (item.wpDependencies.length > 0) {
        milestone.wpDependencies.pop();
      }
      // insert new wpDependencies	
      for (var i = 0; i < wpDep.length; i++) {
         milestone.wpDependencies.push(wpDep[i]);
      }
    }
    if((msDep) && (!milestone.msDependencies.equal(msDep))) {
      // remove old msDependencies
      while (item.msDependencies.length > 0) {
        milestone.msDependencies.pop();
      }
      // insert new msDependencies	
      for (var i = 0; i < msDep.length; i++) {
         milestone.msDependencies.push(msDep[i]);
      }
    }
    if ((reqComp) && (!milestone.requiredCompletion.equal(reqComp))) {
      // remove old requiredCompletion
      while (item.requiredCompletion.length > 0) {
        milestone.requiredCompletion.pop();
      }
      // insert new requiredCompletion	
      for (var i = 0; i < msDep.length; i++) {
         milestone.requiredCompletion.push(reqComp.title[i]);
         milestone.requiredCompletion.push(reqComp.percentage[i]);
      }
    }
    milestone.lastModifiedDate = new Date();
    milestone.lastModifiedBy = userId;
  });
  project.milestones.markModified(milestone);
  project.save(function(err) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end()
     }  
   }
  res.json(req.project.milestone);
  res.end();
}; // end editMilestone

// deleteMilestone - changes the status of the milestone to 'deleted'
Milestone.methods.deleteMilestone = function(id, userId) {
  var project = new Project();
  var milestone = new Milestone();
  project.milestones.findById(id, 'status lastModifiedDate lastModifiedBy', function(err, milestone) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end();
    }
    // change status to deleted
    milestone.status = 'deleted';
    milestone.lastModifiedDate = Date.now;
    milestone.lastModifiedBy = userId;
    	
    project.milestones.markModified(milestone);
  });
  project.save(function(err) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end()
    }  
  }
  res.json(req.project.milestone);
  res.end();
}; // end deleteMilestone

// viewDeletedItems - retrieves all milestones that have 'deleted' status
Milestone.methods.viewDeletedItems = function() {
  var project = new Project();
  project.milestones.find({ status: 'deleted' }, function(err, list) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end();
    }
    return list; // is this right??
}; // end viewDeletedItems (milestone)

// enableDeletedItem - reverts status of deleted mileston back to 'open'
Milestone.methods.enableDeletedItem = function(id) {
  var project = new Project();
  var milestone = new Milestone();
  project.milestones.findById(id, 'status', function(err, milestone) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end();
    }
    // change status back to open
    milestone.status = 'open';
    project.milestones.markModified(milestone);
  });
  project.save(function(err) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end()
    }  
  }
  res.json(req.project.milestone);
  res.end();  
}); // end enableDeletedItem (milestone)
