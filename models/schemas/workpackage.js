var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Utilities = require('../../utilities');

var WorkPackage = new Schema({
  title: { type: String, required: true, unique: true, trim: true, sparse: true },
  description: { type: String, trim: true },
  priority: { type: String, trim: true }, //required?
  timeEstimate: { type: Number, min: 0, default: 0, required: true }, // timeEstimate is a value representing number of hours
  timeSpent: { type: Number, min: 0, default: 0 },
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' },
  dependencies: [{ type: ObjectId }],
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

module.exports = WorkPackage;

WorkPackage.methods = {
  getWeight: function() {
    this.priority = this.priority || 'Medium';
    return Utilities.getPriorityWeight(this.priority);
  },

  getWorkItems: function(project) {
    var workItems = [];
    project.workItems.forEach(function(workItem) {
      if (Utilities.findInArray(workItem.workPackages, this._id)) {
        workItems.push(workItem);
      }
    }, this);
    return workItems;
  },

  getCompletion: function(ids, project) {
    ids = ids || {};
    if (!ids[this._id]) {
      ids[this._id] = true;
      var completionPercentage = 0;
      var sum = 0;
      var workItems = this.getWorkItems(project);
      var amount = 0;
      var completedDependencies = 0;
      var ownWeight = 4;
      var timeSpent = 0;

      workItems.forEach(function(workItem) {
        var weight = workItem.getWeight();
        amount += weight;
        sum += workItem.getCompletion(ids, project) * weight;
        timeSpent += workItem.timeSpent;
      });

      this.timeSpent = timeSpent;

      if (amount) {
        completionPercentage = sum / amount;
      }

      amount = 0;
      sum = 0;

      this.dependencies.forEach(function(dependency) {
        dependency = project.hasWorkPackageAndRetrieve(dependency);
        if (dependency) {
          var weight = dependency.getWeight();
          amount += weight;
          sum += dependency.getCompletion(ids, project) * weight;
        }
      });

      if (amount) {
        completedDependencies = sum / amount;
      } else {
        completedDependencies = 100;
      }

      this.completionPercentage = completionPercentage - (100 - completedDependencies) / ownWeight;

      if (this.completionPercentage < 0) {
        this.completionPercentage = 0;
      }

      if (this.completionPercentage > 100) {
        this.completionPercentage = 100;
      }
    }
    return this.completionPercentage;
  }
};