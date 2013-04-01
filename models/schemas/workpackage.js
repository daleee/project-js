var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

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