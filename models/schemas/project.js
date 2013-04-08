var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Milestone = require('./milestone');
var WorkPackage = require('./workpackage');
var ProjectUser = require('./project-user');
var WorkItem = require('./workitem');
var WorkBreakdownItem = require('./workbreakdown-item');
var Utilities = require('../../utilities');

var Project = new Schema({
  title: { type: String, required: true, unique: true, trim: true, sparse: true },
  description: { type: String, trim: true },
  clientName: { type: String, trim: true },
  projectDueDate: { type: Date },
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
  workItems: [WorkItem]
});

module.exports = Project;

Project.methods = {
  getCompletion: function(ids) {
    ids = ids || {};
    if (!ids[this._id]) {
      ids[this._id] = true;
      var completionPercentage = 0;
      var sum = 0;
      var amount = 0;

      if (this.milestones.length) {
        this.milestones.forEach(function(milestone) {
          var weight = milestone.getWeight();
          amount += weight;
          sum += milestone.getCompletion(ids, this) * weight;
        }, this);
      } else if (this.workPackages.length) {
        this.workPackages.forEach(function(workPackage) {
          var weight = workPackage.getWeight();
          amount += weight;
          sum += workPackage.getCompletion(ids, this) * weight;
        }, this);
      } else {
        this.workItems.forEach(function(workItem) {
          var weight = workItem.getWeight();
          amount += weight;
          sum += workItem.getCompletion(ids, this) * weight;
        }, this);
      }

      if (amount) {
        completionPercentage = sum / amount;
      }

      this.completionPercentage = completionPercentage;
    }
    return this.completionPercentage;
  },

  hasUser: function(id, cb) {
    return !!this.hasUserAndRetrieve(id, cb);
  },

  hasUserAndRetrieve: function(id, cb) {
    var item = Utilities.findInArrayInner(this.projectUsers, id, 'user');
    if (cb) cb(item);
    return item;
  },

  hasUserAndRetrieveIndex: function(id, cb) {
    var item = Utilities.findIndexInArrayInner(this.projectUsers, id, 'user');
    if (cb) cb(item);
    return item;
  },

  hasMilestoneAndRetrieve: function(id, cb) {
    return this.find('milestones', id, cb);
  },

  hasWorkPackageAndRetrieve: function(id, cb) {
    return this.find('workPackages', id, cb);
  },

  hasWorkItemAndRetrieve: function(id, cb) {
    return this.find('workItems', id, cb);
  },

  hasWorkBreakdownItemAndRetrieve: function(id, cb) {
    return this.find('workBreakdownItems', id, cb);
  },

  find: function(listName, id, cb) {
    var item = Utilities.findInArray(this[listName], id);
    if (cb) {
      cb(item);
    }
    return item;
  },

  findIndex: function(listName, id, cb) {
    var index = Utilities.findIndexInArray(this[listName], id);
    if (cb) {
      cb(index);
    }
    return index;
  }
};

Project.pre('save', function(next) {
  var project = this;
  project.getCompletion();
  project.lastModifiedDate = new Date();
  next();
});