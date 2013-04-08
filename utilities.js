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
    id = id.toString();
    for (var i = 0; i < list.length; ++i) {
      var otherId = list[i]._id || list[i];
      if (otherId.toString() === id) {
        return list[i];
      }
    }
    return false;
  },

  findIndexInArray: function(list, id) {
    id = id.toString();
    for (var i = 0; i < list.length; ++i) {
      var otherId = list[i]._id || list[i];
      if (otherId.toString() === id) {
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
  },

  getPriorityWeight: function(weight) {
    return priorityWeights[weight.toLowerCase()];
  }
};

var priorityWeights = {
  low: 0.25,
  medium: 0.5,
  high: 0.75,
  urgent: 1
};