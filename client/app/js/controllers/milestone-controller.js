PJS.Controllers.Milestone = {
  relations: {
    'wpDependencies': {inner: 'wkpackage', list: 'workPackages', type: 'WorkPackage'},
    'msDependencies': {list: 'milestones', type: 'Milestone'}
  },

  list: function($scope, $routeParams, Milestone, Project, WorkPackage) {
    var projectId = $routeParams.projectId.toLowerCase();
    $scope.project = Project.get({id: projectId}, function(project) {
      PJS.Controllers.allRelations('Milestone', project, project.milestones);
      $scope.isDefined = PJS.Utilities.isDefined;
      var milestones = PJS.ViewModels.each('Milestone', project.milestones);
      
      $scope.status = 'open';
      $scope.milestones = PJS.Utilities.filterByStatus(milestones, $scope.status);

      $scope.changeMode = function(status) {
        $scope.status = status;
        $scope.milestones = PJS.Utilities.filterByStatus(milestones, $scope.status);
      };
    });
  },

  get: function($scope, $routeParams, Milestone, Project, WorkPackage) {
    var projectId = $routeParams.projectId.toLowerCase();
    var milestoneId = $routeParams.milestoneId.toLowerCase();
    $scope.project = Project.get({id: projectId}, function(project) {
      var milestone = PJS.Utilities.findInArray(project.milestones, milestoneId);
      PJS.Controllers.relations('Milestone', project, milestone);
      $scope.isDefined = PJS.Utilities.isDefined;
      $scope.milestone = PJS.ViewModels.Milestone(milestone);
    });
  },

  add: function($scope, $routeParams, Milestone, Project) {
    var projectId = $routeParams.projectId.toLowerCase();
    $scope.addMilestone = function() {
      var milestone = new Milestone({title: $scope.title, description: $scope.description});
      milestone.projectId = projectId;
      milestone.$save(milestone);
      window.location = '/#/projects/' + projectId + '/milestones/' + PJS.Utilities.dashed(milestone.title);
    };
  },

  update: function() {
    var projectId = $routeParams.projectId.toLowerCase();
    var milestoneId = $routeParams.milestoneId.toLowerCase();
    Project.get({id: projectId}, function(project) {
      Milestone.get({projectId: projectId, id: milestoneId}, function(milestone) {
        $scope.updateMilestone = function() {
          milestone.title = $scope.title;
          milestone.description = $scope.description;
          milestone.projectId = projectId;
          milestone.$save(milestone);
          window.location = '/#/projects/' + projectId + '/milestones/' + PJS.Utilities.dashed(milestone.title);
        };
      });
    });
  },

  remove: function() {
    var projectId = $routeParams.projectId.toLowerCase();
    var milestoneId = $routeParams.milestoneId.toLowerCase();
    Project.get({id: projectId}, function(project) {
      Milestone.get({projectId: projectId, name: milestoneId}, function(milestone) {
        milestone.$remove({projectId: projectId});
      });
    });
  }
};