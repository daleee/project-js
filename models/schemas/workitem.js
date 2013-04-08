var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Utilities = require('../../utilities');

var Comment = require('./comment');

var WorkItem = new Schema({
  title: { type: String, required: true, unique: true, trim: true, sparse: true },
  description: { type: String, trim: true },
  workPackages: [{ type: ObjectId }],
  assignedUsers: [{ type: ObjectId, ref: 'User' }],
  dependencies: [{ type: ObjectId }],
  startDate: { type: Date, required: true },
  timeEstimate: { type: Number, min: 0, default: 0, required: true }, // timeEstimate is a value representing number of hours
  timeSpent: { type: Number, min: 0, default: 0, min: 0 }, // timeSpent is a value representing number of hours
  ownCompletionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' },
  comments: [Comment],
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

module.exports = WorkItem;

WorkItem.methods = {
  getWeight: function() {
    return 0.5;
  },

  getCompletion: function(ids, project) {
    ids = ids || {};
    if (!ids[this._id]) {
      ids[this._id] = true;
      var completionPercentage = 0;
      var sum = 0;
      var amount = 0;
      var ownWeight = 4;

      this.dependencies.forEach(function(dependency) {
        dependency = project.hasWorkItemAndRetrieve(dependency);
        if (dependency) {
          var weight = dependency.getWeight();
          amount += weight;
          sum += dependency.getCompletion(ids, project) * weight;
        }
      });

      if (amount) {
        completionPercentage = sum / amount;
      } else {
        completionPercentage = 100;
      }

      this.completionPercentage = this.ownCompletionPercentage - (100 - completionPercentage) / ownWeight;

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