PJS.Controllers.WorkPackage = {
  relations: {
    'dependencies': {list: 'workPackages', type: 'WorkPackage'}
  },

  reverseRelations: {
    'workItems': {list: 'workItems', relation: 'workPackages', type: 'WorkItem'}
  },

  list: function($scope, $routeParams, WorkPackage, Project, WorkItem) {
    $scope.project = Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      PJS.Controllers.allRelations('WorkPackage', project, project.workPackages);
      var workPackages = PJS.ViewModels.each('WorkPackage', project.workPackages);
      $scope.status = ['open', 'late'];
      $scope.workPackages = PJS.Utilities.filterByStatus(workPackages, $scope.status);
      $scope.hasWorkPackages = !!workPackages.length;

      $scope.changeMode = function(status) {
        $scope.status = status;
        $scope.workPackages = PJS.Utilities.filterByStatus(workPackages, $scope.status);
      };
    });
  },

  get: function($scope, $routeParams, WorkPackage, Project, WorkItem) {
    $scope.project = Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      var workPackage = PJS.Utilities.findInArray(project.workPackages, $routeParams.workPackageId.toLowerCase());
      PJS.Controllers.relations('WorkPackage', project, workPackage);
      $scope.workPackage = PJS.ViewModels.WorkPackage(workPackage);
    });
  }
};