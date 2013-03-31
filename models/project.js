//Project Model
//Project.JS
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ProjectUser = new Schema({
  user: { type: ObjectId, ref: 'User'},
  role: { type: ObjectId, ref: 'Role'} 
});

var WorkBreakdownItem = new Schema({
  title: { type: String, required: true, unique: true, trim: true, sparse: true },
  description: { type: String, trim: true },
  children: [{ type: ObjectId }],
  status: { type: String, trim: true, default: 'open' },
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

var WorkBreakdown = new Schema({
  items: [{ type: ObjectId }],
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

var WorkPackage = new Schema({
  title: { type: String, required: true, unique: true, trim: true, sparse: true },
  description: { type: String, trim: true },
  priority: { type: String, trim: true }, //required?
  timeEstimate: { type: Number, required: true }, // timeEstimate is a value representing number of days
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' }, 
  dependencies: [{ type: ObjectId }],
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

var Comment = new Schema({
  title: { type: String, trim: true },
  text: { type: String, required: true },
  postedBy: { type: ObjectId, ref: 'User' }, 
  datePosted: { type: Date, default: Date.now }
});

var workItemSchema = new Schema({
  title: { type: String, required: true, unique: true, trim: true, sparse: true },
  description: { type: String, trim: true },
  workPackages: [{ type: ObjectId }], 
  assignedUsers: [{ type: ObjectId, ref: 'User' }], 
  dependencies: [{ type: ObjectId }],
  startDate: { type: Date, required: true },
  timeEstimate: { type: Number, required: true }, // timeEstimate is a value representing number of days
  timeSpent: { type: Number, min: 0 }, // timeSpent is a value representing number of days
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' },
  comments: [Comment],
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

var Completion = new Schema({
  wkPackage: { type: ObjectId },
  percentage: { type: Number, min: 0, max: 100 }
});

var Milestone = new Schema({
  title: { type: String, required: true, unique: true, trim: true, sparse: true },
  description: { type: String, trim: true }, 
  dueDate: { type: Date, required: true },
  priority: { type: String, trim: true }, //required?
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' }, 
  wpDependencies: [Completion], 
  msDependencies: [{ type: ObjectId }],
  lastModifiedDate: {type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

var projectSchema = new Schema({
  title: { type: String, required: true, unique: true, trim: true, sparse: true },
  description: { type: String, trim: true }, 
  clientName: { type: String, required: true, trim: true },
  projectDueDate: { type: Date, required: true },
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' }, 
  dateCreated: { type: Date, default: Date.now },
  lastModifiedDate: { type: Date, default: Date.now },
  dateCompleted: { type: Date },
  projectUsers: [ProjectUser],  
  workBreakdownStructure: [WorkBreakdownItem],
  //workBreakdownItems: [WorkBreakdownItem],
  milestones: [Milestone],
  workPackages: [WorkPackage],
  workItems: [workItemSchema]
});

projectSchema.methods.hasUser = function(id, cb) {
  return !!this.hasUserAndRetrieve(id, cb);
};

projectSchema.methods.hasUserAndRetrieve = function(id, cb) {
  var item = findInArrayInner(this.projectUsers, id, 'user');
  if (cb) cb(item);
  return item;
};

projectSchema.methods.hasUserAndRetrieveIndex = function(id, cb) {
  var item = findIndexInArrayInner(this.projectUsers, id, 'user');
  if (cb) cb(item);
  return item;
};

projectSchema.methods.hasMilestoneAndRetrieve = function(id, cb) {
  return this.find('milestones', id, cb);
};

projectSchema.methods.hasWorkPackageAndRetrieve = function(id, cb) {
  return this.find('workPackages', id, cb);
};

projectSchema.methods.hasWorkItemAndRetrieve = function(id, cb) {
  return this.find('workItems', id, cb);
};

projectSchema.methods.hasWorkBreakdownItemAndRetrieve = function(id, cb) {
  return this.find('workBreakdownItems', id, cb);
};

projectSchema.methods.find = function(listName, id, cb) {
  var item = findInArray(this[listName], id);
  if (cb) {
    cb(item);
  }
  return item;
};

projectSchema.methods.findIndex = function(listName, id, cb) {
  var index = findIndexInArray(this[listName], id);
  if (cb) {
    cb(index);
  }
  return index;
};

var findInArrayInner = function(list, id, inner) {
  for (var i = 0; i < list.length; ++i) {
    if (list[i] && list[i][inner] == id) {
      return list[i];
    }
  }
  return false;
};

var findIndexInArrayInner = function(list, id, inner) {
  for (var i = 0; i < list.length; ++i) {
    if (list[i] && list[i][inner] == id) {
      return i;
    }
  }
  return false;
};

var findInArray = function(list, id) {
  for (var i = 0; i < list.length; ++i) {
    if (list[i]._id == id) {
      return list[i];
    }
  }
  return false;
};

var findIndexInArray = function(list, id) {
  for (var i = 0; i < list.length; ++i) {
    if (list[i]._id == id) {
      return i;
    }
  }
  return false;
};

projectSchema.pre('save', function(next) {
  var project = this;
  project.lastModifiedDate = new Date();
  next();
});


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
  project.workBreakdown.markModified(listing);
  project.save(function(err) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end();
    }  
  });
  res.json(req.project.listing);
  res.end();
}; // end WorkBreakdown.addToList

//moveItemInList
WorkBreakdown.methods.moveItemInList = function(id, oldIndex, newIndex, newChildren, userId) {
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
  });
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
  });
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
      res.end();
    }
  });
  res.json(req.project.item);
  res.end();
};

// createListAsCopy
WorkBreakdown.methods.copyStructure = function(params) {
  //find out how this would be done
};

/* Milestone methods */

// addToList adds the newly-created milestone to the MilestoneList
// QUESTION: is a milestone always added to the end of the list or can it be added to the middle?
/*MilestoneListing.methods.addToList = function(id, userId){
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
      res.end();
    }
    res.json(req.project.listing);
    res.end();
  });
}; // end addToList (milestone)
*/
// editMilestone - updates a project milestone with changes user has made
Milestone.methods.editMilestone = function(id, newTitle, newDesc, newPriority, newStatus, wpDep, msDep, reqComp, userId){
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
   });
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
  });
  res.json(req.project.milestone);
  res.end();
}; // end deleteMilestone

// viewDeletedItems - retrieves all milestones that have 'deleted' status
Milestone.methods.viewDeletedItems = function() {
  var project = new Project();
  project.milestones.find({'status': 'deleted'}, function(err, list) {
    if (err) {
      console.log(err);
      res.send(500, err);
      res.end();
    }
    res.send(list);
    res.end();
  });
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
    project.save(function(err) {
      if (err) {
        res.send(500, err);
        res.end();
      }
  res.json(req.project.milestone);
  res.end();
    });
  });
}; // end enableDeletedItem (milestone)

var Project = mongoose.model('Project', projectSchema);
