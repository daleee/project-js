var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ProjectUser = new Schema({
  user: { type: ObjectId, ref: 'User'},
  role: { type: ObjectId, ref: 'Role'} 
});

module.exports = ProjectUser;