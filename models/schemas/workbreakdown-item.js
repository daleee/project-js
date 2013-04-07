var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var WorkBreakdownItem = new Schema({
  title: { type: String, trim: true, sparse: true },
  description: { type: String, trim: true },
  children: [{ type: ObjectId }],
  status: { type: String, trim: true, default: 'open' },
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

module.exports = WorkBreakdownItem;

WorkBreakdownItem.methods = {
  //editItem
  editItem: function(id, newTitle, newDesc, userId) {
    var project = new Project();
    var item = new WorkBreakdownItem();
    
    // retrieve the work breakdown item from the db
    project.workBreakdownItems.findById(id, 'title description lastModifiedDate lastModifiedBy', function(err, item) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end();
      }
      if (newTitle) {
        item.title = newTitle;
      }
      if (newDesc) {
        item.description = newDesc;
      }
      item.lastModifiedDate = new Date();
      item.lastModifiedBy = userId;
      project.workBreakdownItems.markModified(item);
    });
    project.save(function(err) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end()
      }  
    });
    res.json(req.project.item);
    res.end();
  },

  //deleteItem
  deleteItem: function(id, userId) {
    var project = new Project();
    var item = new WorkBreakdownItem();
    // retrieve item from the db
    project.workBreakdownItems.findById(id, 'status lastModifiedDate lastModifiedBy', function(err, item) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end();
      }
      // change status to deleted
      item.status = 'deleted';
      item.lastModifiedDate = new Date();
      item.lastModifiedBy = userId;
      project.workBreakdownItems.markModified(item);
    });
    project.save(function(err) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end();
      }
    });
    res.json(req.project.item);
    res.end();
  }
};