PJS.Controllers.WorkPackage = {
  relations: {
    'dependencies': {list: 'workPackages', type: 'WorkPackage'}
  },

  reverseRelations: {
    'workItems': {list: 'workItems', relation: 'workPackages', type: 'WorkItem'}
  },

  list: function($scope, $routeParams, WorkPackage, Project, WorkItem) {
    $scope.hasWorkPackages = true;
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
  },

  add: function($scope, $routeParams, Project, WorkPackage, User) {
    var projectId = $routeParams.projectId.toLowerCase();

    Project.get({id: projectId}, function(project) {
      $scope.project = project;
      $scope.workPackage = {
        dependencies: [],
        completionPercentage: 0,
        status: 'open',
        priority: 'low',
        timeEstimate: 0
      };

      PJS.Controllers.updateRelations($scope, $scope.workPackage, 'dependencies', WorkPackage);

      // TODO: filter these based on what's already chosen
      $scope.workPackagesList = WorkPackage.query({projectId: projectId, list: true});

      $scope.type = 'Add';
      $scope.submitType = 'Create';

      $scope.updateWorkPackage = function() {
        var workPackage = new WorkPackage($scope.workPackage);
        workPackage.projectId = projectId;
        workPackage.$save(workPackage, function(workPackage) {
          window.location = '/#/projects/' + projectId + '/work-packages/' + (workPackage._id || '');
        });
      };
    });
  },

  update: function($scope, $routeParams, Project, WorkPackage, User) {
    var projectId = $routeParams.projectId.toLowerCase();
    var workPackageId = $routeParams.workPackageId.toLowerCase();
    Project.get({id: projectId}, function(project) {
      $scope.project = project;
      WorkPackage.get({projectId: projectId, id: workPackageId}, function(workPackage) {
        $scope.workPackage = workPackage;
        PJS.Controllers.relations('WorkPackage', project, workPackage);

        PJS.Controllers.updateRelations($scope, workPackage, 'dependencies', WorkPackage);

        // TODO: filter these based on what's already chosen
        $scope.workPackagesList = WorkPackage.query({projectId: projectId, list: true});

        $scope.type = 'Edit';
        $scope.submitType = 'Update';
        $scope.workPackage.status = $scope.workPackage.status.type || $scope.workPackage.status;

        $scope.updateWorkPackage = function() {
          workPackage.title = $scope.workPackage.title;
          workPackage.description = $scope.workPackage.description;
          workPackage.dependencies = $scope.workPackage.dependencies;
          workPackage.completionPercentage = $scope.workPackage.completionPercentage;
          workPackage.status = $scope.workPackage.status;
          workPackage.priority = $scope.workPackage.priority;
          workPackage.timeEstimate = $scope.workPackage.timeEstimate;
          workPackage.projectId = projectId;
          workPackage.$save(workPackage, function(workPackage) {
            window.location = '/#/projects/' + projectId + '/work-packages/' + workPackage._id;
          });
        };
      });
    })
  }
};