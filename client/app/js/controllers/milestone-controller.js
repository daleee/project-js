PJS.Controllers.Milestone = {
  relations: {
    'wpDependencies': 'WorkPackage',
    'msDependencies': 'Milestone'
  },

  list: function($scope, $routeParams, Milestone, Project, WorkPackage) {
    var projectId = $routeParams.projectId.toLowerCase();
    $scope.project = Project.get({id: projectId}, function(project) {
      $scope.milestones = Milestone.query({projectId: projectId}, function(milestones) {
        $scope.milestones = milestones;
      });
    });
  },

  get: function($scope, $routeParams, Milestone, Project, WorkPackage) {
    var projectId = $routeParams.projectId.toLowerCase();
    var milestoneId = $routeParams.milestoneId.toLowerCase();
    $scope.project = Project.get({id: projectId}, function(project) {
      Milestone.get({projectId: projectId, id: milestoneId}, function(milestone) {
        $scope.milestone = milestone;
      });
    });
  },

  add: function($scope, $routeParams, Milestone, Project) {
    var projectId = $routeParams.projectId.toLowerCase();
    $scope.addMilestone = function() {
      var milestone = new Milestone({name: $scope.title, description: $scope.description});
      milestone.projectId = projectId;
      milestone.$save(milestone);
      window.location = '/#/projects/' + projectId + '/milestones/' + milestone.title;
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
          window.location = '/#/projects/' + projectId + '/milestones/' + milestone._id;
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