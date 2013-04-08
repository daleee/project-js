var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Comment = require('./comment');

var WorkItem = new Schema({
  title: { type: String, required: true, unique: true, trim: true, sparse: true },
  description: { type: String, trim: true },
  workPackages: [{ type: ObjectId }],
  assignedUsers: [{ type: ObjectId, ref: 'User' }],
  dependencies: [{ type: ObjectId }],
  startDate: { type: Date, required: true },
  timeEstimate: { type: Number, required: true }, // timeEstimate is a value representing number of hours
  timeSpent: { type: Number, min: 0 }, // timeSpent is a value representing number of hours
  ownCompletionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' },
  comments: [Comment],
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

module.exports = WorkItem;

WorkItem.methods = {
  getCompletion: function(ids, project) {
    ids = ids || {};
    if (!ids[this._id]) {
      ids[this._id] = true;
      var completionPercentage = 0;
      var sum = this.ownCompletionPercentage;
      var amount = this.dependencies.length + 1;

      this.dependencies.forEach(function(dependency) {
        dependency = project.hasWorkItemAndRetrieve(dependency);
        if (dependency) sum += dependency.getCompletion(ids, project);
      });

      if (amount) {
        completionPercentage = sum / amount;
      }

      this.completionPercentage = completionPercentage;
    }
    return this.completionPercentage;
  }
};