// User Model
// Project.JS
var mongoose = require('mongoose')
    // need to require the Project Schema (for currentProject & lastModifiedProject), but it is a circular reference
  , passportLocalMongoose = require('passport-local-mongoose');

// username & password fields provided by passport-local-mongoose
var UserSchema = mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  resetMode: { type: Boolean, default: false ),
  siteAdmin: { type: Boolean, default: false },
  registrationDate: { type: Date, default: Date.now },
  currentProject: { type: Schema.Types.ObjectId, ref: 'Project' },
  lastModifiedProject: { type: Schema.Types.ObjectId, required: true, ref: 'Project' }
});

// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
