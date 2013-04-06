var mongoose = require('mongoose');

module.exports = mongoose.model('WorkItem', require('./schemas/workitem'));
