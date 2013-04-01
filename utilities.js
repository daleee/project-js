module.exports = {
  findInArrayInner: function(list, id, inner) {
    for (var i = 0; i < list.length; ++i) {
      if (list[i] && (list[i][inner] == id || 
         (list[i][inner] && list[i][inner]._id == id))) {
        return list[i];
      }
    }
    return false;
  },

  findIndexInArrayInner: function(list, id, inner) {
    for (var i = 0; i < list.length; ++i) {
      if (list[i] && (list[i][inner] == id || 
         (list[i][inner] && list[i][inner]._id == id))) {
        return i;
      }
    }
    return false;
  },

  findInArray: function(list, id) {
    for (var i = 0; i < list.length; ++i) {
      if (list[i]._id == id) {
        return list[i];
      }
    }
    return false;
  },

  findIndexInArray: function(list, id) {
    for (var i = 0; i < list.length; ++i) {
      if (list[i]._id == id) {
        return i;
      }
    }
    return false;
  },
  
  lightList: function(list) {
    var newList = [];
    list.forEach(function(item, index) {
      newList.push({
        _id: item.id,
        title: item.title
      });
    });
    return newList;
  }
};