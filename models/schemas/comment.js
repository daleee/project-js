var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Comment = new Schema({
  title: { type: String, trim: true },
  text: { type: String, required: true },
  postedBy: { type: ObjectId, ref: 'User' }, 
  datePosted: { type: Date, default: Date.now }
});

module.exports = Comment;