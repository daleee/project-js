(function() {

'use strict';

PJS.ViewModels = {
  Project: function(project) {
    return PJS.ViewModels.all(project);
  },
  
  Milestone: function(milestone) {
    return PJS.ViewModels.all(milestone);
  },
  
  WorkItem: function(workItem) {
    return PJS.ViewModels.all(workItem);
  },
  
  WorkBreakdownItem: function(wbItem) {
    return PJS.ViewModels.all(wbItem);
  },
  
  WorkPackage: function(workPackage) {
    return PJS.ViewModels.all(workPackage);
  },

  ProjectUser: function(user) {
    return PJS.ViewModels.all(user);
  },

  User: function(user) {
    return PJS.ViewModels.all(user);
  },

  Role: function(user) {
    return PJS.ViewModels.all(user);
  },

  each: function(viewModelName, list) {
    var ViewModel = PJS.ViewModels[viewModelName];
    var newList = [];
    list.forEach(function(item) {
      newList.push(ViewModel(item));
    });
    return newList;
  },

  all: function(resource) {
    resource = angular.extend({}, resource);
    if (resource.id === undefined) {
      resource.id = resource._id;
    }
    if (resource.status) {
      var type = resource.status;
      resource.status = statuses[resource.status];
      resource.status.type = type;
      resource.status.labelType = labelTypes[resource.status.level];
    }
    return resource;
  },
};

var statuses = {
  'open': {text: 'Open', level: 0},
  'late': {text: 'Late', level: 2},
  'closed': {text: 'Closed', level: 2},
  'deleted': {text: 'Deleted', level: 2}
};

var labelTypes = {
  0: 'label-success',
  1: 'label-warning',
  2: 'label-important'
};

})();