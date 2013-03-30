(function() {

PJS.Controllers.ProjectUser = {
  populate: function(project, projectUsers, User, Role, callback) {
    User.query(function(users) {
      Role.query(function(roles) {
        PJS.Controllers.ProjectUser.populateUsers(projectUsers, users, roles, project, callback);
      });
    });
  },

  populateUsers: function(projectUsers, users, roles, project, callback) {
    projectUsers.forEach(function(userObj) {
      PJS.Controllers.ProjectUser.populateUser(users, roles, userObj);
    });
    if (project) {
      project.usersByRole = usersByRole(projectUsers);
    }
    if (callback) {
      callback(projectUsers);
    }
    return projectUsers;
  },

  populateUser: function(users, roles, userObj) {
    userObj.userId = userObj.user;
    userObj.roleId = userObj.role;
    userObj.user = PJS.Utilities.findInArray(users, userObj.userId);
    userObj.role = PJS.Utilities.findInArray(roles, userObj.roleId);
    return userObj;
  },

  update: function($scope, $routeParams, User, Project, Role, ProjectUser) {
    var projectId = $routeParams.projectId.toLowerCase();

    User.query(function(users) {
      $scope.usersList = PJS.ViewModels.each('User', users);
      Role.query(function(roles) {
        $scope.rolesList = PJS.ViewModels.each('Role', roles);
        ProjectUser.query({projectId: projectId}, function(projectUsers) {
          PJS.Controllers.ProjectUser.populateUsers(projectUsers, users, roles);
          $scope.users = projectUsers;

          $scope.updateRole = function(userObj) {
            userObj.roleId = userObj.role.id;
            userObj.$save({id: userObj.user.id, projectId: projectId}, function(updated) {
              var index = projectUsers.indexOf(userObj);
              if (index !== -1) {
                projectUsers[index] = PJS.Controllers.ProjectUser.populateUser(users, roles, updated);
              }
            });
          };

          $scope.addUser = function() {
            var userId = $scope.addUserChosen._id;
            var roleId = $scope.addRoleChosen._id;
            var index = PJS.Utilities.findIndexInArray(projectUsers, userId);
            if (index === -1) {
              var projectUser = new ProjectUser({userId: userId, roleId: roleId});
              projectUser.projectId = projectId;
              projectUser.$save(projectUser, function(added) {
                projectUsers.push(PJS.Controllers.ProjectUser.populateUser(users, roles, added));
              });
            }
          };

          $scope.removeUser = function(userObj) {
            var index = projectUsers.indexOf(userObj);
            if (index !== -1) {
              userObj.$delete({projectId: projectId, id: userObj.user.id}, function() {
                projectUsers.splice(index, 1);
              });
            }
          };

        });
      });
    });
  }
};

var usersByRole = function(users) {
  var byRole = {};
  users.forEach(function(userObj) {
    if (userObj.role) {
      byRole[userObj.role.title] = byRole[userObj.role.title] || [];
      byRole[userObj.role.title].push(userObj.user);
    }
  });
  return byRole;
};

})();