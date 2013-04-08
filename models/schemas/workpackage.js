var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Utilities = require('../../utilities');

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

module.exports = WorkPackage;

WorkPackage.methods = {
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
      var amount = (workItems.length + this.dependencies.length);

      workItems.forEach(function(workItem) {
        sum += workItem.getCompletion(ids, project);
      });
      this.dependencies.forEach(function(dependency) {
        dependency = project.hasWorkPackageAndRetrieve(dependency);
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