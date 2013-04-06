(function() {

PJS.Controllers.ProjectUser = {
  usersByRole: function(users) {
    var byRole = {};
    users.forEach(function(userObj) {
      if (userObj.role) {
        byRole[userObj.role.title] = byRole[userObj.role.title] || [];
        byRole[userObj.role.title].push(userObj.user);
      }
    });
    return byRole;
  },

  update: function($scope, $routeParams, User, Project, Role, ProjectUser) {
    var projectId = $routeParams.projectId.toLowerCase();
    $scope.hasUsers = true;

    User.query(function(users) {
      $scope.usersList = PJS.ViewModels.each('User', users);
      Role.query(function(roles) {
        $scope.rolesList = PJS.ViewModels.each('Role', roles);
        ProjectUser.query({projectId: projectId}, function(projectUsers) {
          $scope.hasUsers = !!projectUsers.length;
          $scope.users = projectUsers;
          $scope.setSelectedOptionUser = setSelectedOptionUser;

          $scope.updateRole = function(userObj) {
            var role = userObj.role;
            userObj.roleId = role.id;
            userObj.$save({id: userObj.user.id, projectId: projectId}, function(updated) {
              var index = projectUsers.indexOf(userObj);
              if (index !== -1) {
                projectUsers[index].user = PJS.ViewModels.User(updated.user);
                projectUsers[index].role = PJS.ViewModels.Role(updated.role);
                projectUsers[index].id = updated.user.id;
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
                added.user = PJS.ViewModels.User(added.user);
                added.role = PJS.ViewModels.Role(added.role);
                added.id = added.user.id;
                projectUsers.push(added);
                $scope.hasUsers = !!projectUsers.length;
              });
            }
          };

          $scope.removeUser = function(userObj) {
            var index = projectUsers.indexOf(userObj);
            if (index !== -1) {
              userObj.$delete({projectId: projectId, id: userObj.user.id}, function() {
                projectUsers.splice(index, 1);
                $scope.hasUsers = !!projectUsers.length;
              });
            }
          };

        });
      });
    });
  }
};

var setSelectedOptionUser = function(userObj) {
  var selectMenu = document.getElementById(userObj.user.id + '-menu');
  PJS.Utilities.setSelectedOption(selectMenu, userObj.role.title);
};

})();