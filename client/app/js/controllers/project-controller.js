PJS.Controllers.Project = {
  list: function($scope, $routeParams, Project) {
    $scope.projects = Project.query(function(projects) {
      var sortingMethod = PJS.Controllers.Project.sortingMethods[$routeParams.sort] ? $routeParams.sort : 'name';
      $scope.projects = PJS.Controllers.Project.sortingMethods[sortingMethod]($scope.projects);
    });
  },
  
  get: function($scope, $routeParams, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.project = project;
    });
  },
  
  add: function($scope, $routeParams, Project) {
    $scope.addProject = function() {
      var project = new Project({id: $scope.title, description: $scope.description});
      project.$save(project);
    };
  },
  
  update: function($scope, $routeParams, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.updateProject = function() {
        project.name = $scope.title;
        project.description = $scope.description;
        project.$save(project);
      };
    });
  },
  
  remove: function($scope, $routeParams, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      project.$remove(project);
    });
  },
  
  sortingMethods: {
    priority: function(projects) {
      return projects.sort(function(a, b) {
        return a.priority > b.priority ? 1 : -1;
      });
    },
    
    due: function(projects) {
      return projects; // TODO: Implement this.
    },
    
    name: function(projects) {
      return projects.sort(function(a, b) {
        return a.name > b.name ? 1 : -1;
      });
    }
  }
};