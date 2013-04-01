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
  timeEstimate: { type: Number, required: true }, // timeEstimate is a value representing number of days
  timeSpent: { type: Number, min: 0 }, // timeSpent is a value representing number of days
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' },
  comments: [Comment],
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

module.exports = WorkItem;