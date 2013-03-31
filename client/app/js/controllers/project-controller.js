(function() {

PJS.Controllers.Project = {
  lightList: function($scope, $routeParams, Project, User, Role) {
    $scope.projectsList = Project.query({list: true});
  },

  list: function($scope, $routeParams, Project, User, Role) {
    $scope.projects = Project.query(function(projects) {
      var sortingMethod = PJS.Controllers.Project.sortingMethods[$routeParams.sort] ? $routeParams.sort : 'name';
      $scope.projects.forEach(function(project) {
        PJS.Controllers.ProjectUser.populate(project, project.projectUsers, User, Role);
      });
      $scope.projects = PJS.Controllers.Project.sortingMethods[sortingMethod]($scope.projects);
    });
  },
  
  getMain: function($scope, $routeParams, Project, User, Role) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.project = project;
      PJS.Controllers.ProjectUser.populate(project, project.projectUsers, User, Role);
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
  },
  
  sortingMethods: {
    priority: function(projects) {
      return projects.sort(function(a, b) {
        return a.priority > b.priority ? 1 : -1;
      });
    },
    
    due: function(projects) {
      return projects.sort(function(a, b) {
        return a.projectDueDate > b.projectDueDate ? 1 : -1;
      });
    },
    
    name: function(projects) {
      return projects.sort(function(a, b) {
        return a.name > b.name ? 1 : -1;
      });
    }
  }
};

var setSelectedOptionProject = function(project) {
  if (project) {
    var selectMenu = document.getElementById('projects-menu');
    PJS.Utilities.setSelectedOption(selectMenu, project.title);
  }
};

})();