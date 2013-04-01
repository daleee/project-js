var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Completion = require('./completion');

var Milestone = new Schema({
  title: { type: String, required: true, unique: true, trim: true, sparse: true },
  description: { type: String, trim: true }, 
  dueDate: { type: Date },
  priority: { type: String, trim: true }, //required?
  completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, trim: true, default: 'open' }, 
  wpDependencies: [Completion], 
  msDependencies: [{ type: ObjectId }],
  lastModifiedDate: {type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

module.exports = Milestone;

Milestone.methods = {
  // editMilestone - updates a project milestone with changes user has made
  editMilestone: function(id, newTitle, newDesc, newPriority, newStatus, wpDep, msDep, reqComp, userId){
    var project = new Project();
    var milestone = new Milestone();
    // retrieve the milestone from the db
    project.milestones.findById(id, function(err, milestone) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end();
      }
      if (newTitle) {
        milestone.title = newTitle;
      }
      if (newDesc) {
        milestone.description = newDesc;
      }
      if (newPriority) {
        milestone.priority = newPriority;
      }
      if (newStatus) {
        milestone.status = newStatus;
      }
      if((wpDep) && (!milestone.wpDependencies.equal(wpDep))) {
        // remove old wpDependencies
        while (item.wpDependencies.length > 0) {
          milestone.wpDependencies.pop();
        }
        // insert new wpDependencies  
        for (var i = 0; i < wpDep.length; i++) {
           milestone.wpDependencies.push(wpDep[i]);
        }
      }
      if((msDep) && (!milestone.msDependencies.equal(msDep))) {
        // remove old msDependencies
        while (item.msDependencies.length > 0) {
          milestone.msDependencies.pop();
        }
        // insert new msDependencies  
        for (var i = 0; i < msDep.length; i++) {
           milestone.msDependencies.push(msDep[i]);
        }
      }
      if ((reqComp) && (!milestone.requiredCompletion.equal(reqComp))) {
        // remove old requiredCompletion
        while (item.requiredCompletion.length > 0) {
          milestone.requiredCompletion.pop();
        }
        // insert new requiredCompletion  
        for (var i = 0; i < msDep.length; i++) {
           milestone.requiredCompletion.push(reqComp.title[i]);
           milestone.requiredCompletion.push(reqComp.percentage[i]);
        }
      }
      milestone.lastModifiedDate = new Date();
      milestone.lastModifiedBy = userId;
    });
    project.milestones.markModified(milestone);
    project.save(function(err) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end()
       }  
     });
    res.json(req.project.milestone);
    res.end();
  }, 

  // deleteMilestone - changes the status of the milestone to 'deleted'
  deleteMilestone: function(id, userId) {
    var project = new Project();
    var milestone = new Milestone();
    project.milestones.findById(id, 'status lastModifiedDate lastModifiedBy', function(err, milestone) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end();
      }
      // change status to deleted
      milestone.status = 'deleted';
      milestone.lastModifiedDate = Date.now;
      milestone.lastModifiedBy = userId;
        
      project.milestones.markModified(milestone);
    });
    project.save(function(err) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end()
      }  
    });
    res.json(req.project.milestone);
    res.end();
  },

  // viewDeletedItems - retrieves all milestones that have 'deleted' status
  viewDeletedItems: function() {
    var project = new Project();
    project.milestones.find({'status': 'deleted'}, function(err, list) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end();
      }
      res.send(list);
      res.end();
    });
  },

  // enableDeletedItem - reverts status of deleted mileston back to 'open'
  enableDeletedItem: function(id) {
    var project = new Project();
    var milestone = new Milestone();
    project.milestones.findById(id, 'status', function(err, milestone) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end();
      }
      // change status back to open
      milestone.status = 'open';
      project.milestones.markModified(milestone);
      project.save(function(err) {
        if (err) {
          res.send(500, err);
          res.end();
        }
    res.json(req.project.milestone);
    res.end();
      });
    });
  }
};