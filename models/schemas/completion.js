var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Completion = new Schema({
  wkPackage: { type: ObjectId },
  percentage: { type: Number, min: 0, max: 100 }
});

module.exports = Completion;