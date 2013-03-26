// Role Model
// Project.JS
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
  title: { type: String, required: true, unique: true, trim: true },
  permissions: [{ type: String, required: true, trim: true }] // only permitted actions will be listed in this array 
});

var Role = mongoose.model('Role', roleSchema);