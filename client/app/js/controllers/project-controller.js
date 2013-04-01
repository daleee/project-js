(function() {

PJS.Controllers.Project = {
  lightList: function($scope, $routeParams, Project, User, Role) {
    $scope.projectsList = Project.query({list: true});
  },

  list: function($scope, $routeParams, Project, User, Role) {
    $scope.projects = Project.query(function(projects) {
      $scope.projects.forEach(function(project) {
        project.usersByRole = PJS.Controllers.ProjectUser.usersByRole(project.projectUsers);
      });
    });
  },
  
  getMain: function($scope, $routeParams, Project, User, Role) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      project.usersByRole = PJS.Controllers.ProjectUser.usersByRole(project.projectUsers);
      $scope.project = project;
      $scope.upcomingMilestones = project.milestones.sort(function(a, b) {
        return a.dueDate > b.dueDate ? -1 : 1;
      }).splice(0, 5);
      $scope.latestIssues = project.workItems.sort(function(a, b) {
        return a.lastModifiedDate > b.lastModifiedDate ? -1 : 1;
      }).splice(0, 5);
    });
  },
  
  get: function($scope, $routeParams, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.project = project;
    });
    $scope.setSelectedOptionProject = setSelectedOptionProject;
  },
  
  add: function($scope, $routeParams, Project) {
    $scope.addProject = function() {
      var project = new Project({title: $scope.title, description: $scope.description, 
        clientName: 'testing', projectDueDate: new Date()});
      project.$save(project, function(project) {
        window.location = '/#/projects/' + project._id;
        window.location.reload(true);
      });
    };
  },
  
  update: function($scope, $routeParams, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.updateProject = function() {
        project.name = $scope.title;
        project.description = $scope.description;
        project.$save(project, function(project) {
          window.location = '/#/projects/' + project._id;
          window.location.reload(true);
        });
      };
    });
  },
  
  remove: function($scope, $routeParams, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      project.$remove(project);
      window.location = '/#/projects/';
    });
  }
};

var setSelectedOptionProject = function(project) {
  if (project) {
    var selectMenu = document.getElementById('projects-menu');
    PJS.Utilities.setSelectedOption(selectMenu, project.title);
  }
};

})();