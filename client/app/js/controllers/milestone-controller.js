PJS.Controllers.Milestone = {
  relations: {
    'wpDependencies': 'WorkPackage',
    'msDependencies': 'Milestone'
  },

  list: function($scope, $routeParams, Milestone, Project, WorkPackage) {
    var projectId = $routeParams.projectId.toLowerCase();
    $scope.project = Project.get({id: projectId}, function(project) {
      $scope.milestones = PJS.ViewModels.each('Milestone', project.milestones);
    });
  },

  get: function($scope, $routeParams, Milestone, Project, WorkPackage) {
    var projectId = $routeParams.projectId.toLowerCase();
    var milestoneId = $routeParams.milestoneId.toLowerCase();
    $scope.project = Project.get({id: projectId}, function(project) {
      var milestone = PJS.Utilities.findInArray(project.milestones, milestoneId);
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