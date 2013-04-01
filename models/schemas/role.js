var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Role = new Schema({
  title: { type: String, required: true, unique: true, trim: true, sparse: true },
  permissions: [{ type: String, required: true, trim: true }] // only permitted actions will be listed in this array 
});

module.exports = Role;