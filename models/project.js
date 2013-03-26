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
  //itemNumber: { type: Number, required: true, unique: true },
  title: { type: String, required: true, unique: true, trime: true },
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
  //wpNumber: { type: Number, required: true, unique: true }, 
  title: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true },
  priority: { type: String, trim: true }, //required?
  timeEstimate: { type: Number, required: true }, // timeEstimate is a value representing number of days
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' }, 
  dependencies: [{ type: ObjectId }],
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

var WorkPackageListing = new Schema({
  items: [{ type: ObjectId }],
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

var Comment = new Schema({
  //commentNumber: { type: Number, required: true }, //unique?
  title: { type: String, trim: true },
  text: { type: String, required: true },
  postedBy: { type: ObjectId, ref: 'User' }, 
  datePosted: { type: Date, default: Date.now }
});

var WorkItem = new Schema({
  //itemNumber: { type: Number, required: true, unique: true }, 
  title: { type: String, required: true, unique: true, trim: true },
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

var WorkItemListing = new Schema({
  items: [{ type: ObjectId }],
  lastModifiedDate: {type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' } 
});

var Completion = new Schema({
  wkPackage: { type: ObjectId, required: true },
  percentage: { type: Number, required: true, min: 0, max: 100, default: 100 }
});

var Milestone = new Schema({
  //msNumber: { type: Number, required: true, unique: true }, 
  title: { type: String, required: true, unique: true, trim: true },
  description: { type: String, trim: true }, 
  dueDate: { type: Date, required: true },
  priority: { type: String, trim: true }, //required?
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' }, 
  wpDependencies: [{ type: ObjectId }], 
  msDependencies: [{ type: ObjectId }],
  requiredCompletion: [Completion],
  lastModifiedDate: {type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

var MilestoneListing = new Schema({
  items: [{ type: ObjectId }],
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' } 
});

var projectSchema = new Schema({
  title: { type: String, required: true, unique: true, trim: true },
  clientName: { type: String, required: true, trim: true },
  projectDueDate: { type: Date, required: true },
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' }, 
  dateCreated: { type: Date, default: Date.now },
  lastModifiedDate: { type: Date, default: Date.now },
  dateCompleted: { type: Date },
  projectUsers: [ProjectUser],  
  workBreakdownStructure: [WorkBreakdown],
  workBreakdownItems: [WorkBreakdownItem],
  milestoneList: [MilestoneListing],
  milestones: [Milestone],
  workPackageList: [WorkPackageListing],
  workPackages: [WorkPackage],
  workItemList: [WorkItemListing],
  workItems: [WorkItem]
});

projectSchema.methods.hasUser = function(id, cb) {
  for (var i = 0; i < this.projectUsers.length; i += 1) {
    if (this.projectUsers[i].user._id == id) {
      return true;
    }
  }
  return false;
};

projectSchema.methods.hasUserAndRetrieve = function(id, cb) {
  for (var i = 0; i < this.projectUsers.length; i += 1) {
    if (this.projectUsers[i].user._id == id) {
      return this.projectUsers[i];
    }
  }
  return false;
};

projectSchema.methods.hasUserAndRetrieveIndex = function(id, cb) {
  for (var i = 0; i < this.projectUsers.length; i += 1) {
    if (this.projectUsers[i].user._id == id) {
      return i;
    }
  }
  return false;
};

projectSchema.methods.hasMilestoneAndRetrieve = function(id, cb) {
  for (var i = 0; i < this.milestones.length; i += 1) {
    if (this.milestones[i]._id == id) {
      return i;
    }
  }
  return false;
};

projectSchema.methods.hasWorkPackageAndRetrieve = function(id, cb) {
  for (var i = 0; i < this.workPackages.length; i += 1) {
    if (this.workPackages[i]._id == id) {
      return i;
    }
  }
  return false;
};

projectSchema.methods.hasWorkItemAndRetrieve = function(id, cb) {
  for (var i = 0; i < this.workItems.length; i += 1) {
    if (this.workItems[i]._id == id) {
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

var Project = mongoose.model('Project', projectSchema);
