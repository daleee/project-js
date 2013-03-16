PJS.Controllers.WorkPackage = {
  relations: {
    'dependencies': 'WorkPackage'
  },

  reverseRelations: {
    'workItems': {relation: 'workPackages', type: 'WorkItem'}
  },

  list: function($scope, $routeParams, WorkPackage, Project, WorkItem) {
    $scope.project = Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.workPackages = WorkPackage.query({projectId: $scope.project._id});
    });
  },

  get: function($scope, $routeParams, WorkPackage, Project, WorkItem) {
    $scope.project = Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.workPackage = WorkPackage.get({projectId: $scope.project._id, id: $routeParams.workPackageId.toLowerCase()});
    });
  }
};