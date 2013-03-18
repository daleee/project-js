(function() {

'use strict';

PJS.ViewModels = {
  Project: function(project) {
    project = PJS.ViewModels.all(project);
    if (project.projectUsers && project.projectUsers.length) {
      project.projectManager = findFirstUserByRole(project.projectUsers, 'projectmanager').user;
    }
    project.progress = 50; // TODO: Calculate this
    return project;
  },
  
  Milestone: function(milestone) {
    return PJS.ViewModels.all(milestone);
  },
  
  WorkPackage: function(workPackage) {
    return PJS.ViewModels.all(workPackage);
  },

  all: function(resource) {
    resource = angular.extend({}, resource);
    if (resource.status) {
      resource.status = statuses[resource.status];
      resource.status.labelType = labelTypes[resource.status.level];
    }
    return resource;
  },
};

var statuses = {
  'open': {text: 'Open', level: 0},
  'late': {text: 'Late', level: 2},
  'closed': {text: 'Closed', level: 2}
};

var labelTypes = {
  0: 'label-success',
  1: 'label-warning',
  2: 'label-important'
};

var findFirstUserByRole = function(users, role) {
  var user = null;
  for (var i=0; i<users.length && !user; ++i) {
    if (users[i].role === role) {
      user = users[i];
    }
  }
  return user;
};

})();