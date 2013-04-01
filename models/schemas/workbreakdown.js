var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var WorkBreakdown = new Schema({
  items: [{ type: ObjectId }],
  lastModifiedDate: { type: Date, default: Date.now },
  lastModifiedBy: { type: ObjectId, ref: 'User' }
});

module.exports = WorkBreakdown;

WorkBreakdown.methods = {
  moveItemInList: function(id, oldIndex, newIndex, newChildren, userId) {
    var project = new Project();
    var listing = new WorkBreakdown();
    var item = new WorkBreakdownItem();
    
    // remove list item from old index position
    listing.items.splice(oldIndex, 1);
    // add list item to new index position
    listing.items.splice(newIndex, 0, id);
    
    // retrieve work breakdown item and replace old children with new ones
    project.workBreakdownItems.findById(id, function(err, item) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end();
      }
      if (newChildren) {
        if (!item.children.equal(newChildren)){
          // remove old children
          while (item.children.length > 0) {
            item.children.pop();
          }
          // insert new children  
          for (var i = 0; i < newChildren.length; i++) {
            item.children.push(newChildren[i]);
          }
        }
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

  //addToList adds the newly-created WorkBreakdownItem to the WorkBreakdown 'items' array
  addToList: function(id, index, userId) {
    var project = new Project();
    var listing = new WorkBreakdown();
    // add new item to its proper place in the array
    listing.items.splice(index, 0, id);
    listing.lastModifiedDate = new Date();
    listing.lastModifiedBy = userId;
    // mark the work breakdown structure as modified
    project.workBreakdown.markModified(listing);
    project.save(function(err) {
      if (err) {
        console.log(err);
        res.send(500, err);
        res.end();
      }  
    });
    res.json(req.project.listing);
    res.end();
  },

  // createListAsCopy
  copyStructure: function(params) {
    //find out how this would be done
  }
};