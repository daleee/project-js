PJS.Controllers.Milestone = {
  relations: {
    'wpDependencies': {inner: 'wkPackage', list: 'workPackages', type: 'WorkPackage'},
    'msDependencies': {list: 'milestones', type: 'Milestone'}
  },

  list: function($scope, $routeParams, Milestone, Project, WorkPackage) {
    var projectId = $routeParams.projectId.toLowerCase();
    $scope.hasMilestones = true;
    $scope.project = Project.get({id: projectId}, function(project) {
      PJS.Controllers.allRelations('Milestone', project, project.milestones);
      $scope.isDefined = PJS.Utilities.isDefined;
      var milestones = PJS.ViewModels.each('Milestone', project.milestones);

      $scope.status = ['open', 'late'];
      $scope.milestones = PJS.Utilities.filterByStatus(milestones, $scope.status);
      $scope.hasMilestones = !!milestones.length;

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

  add: function($scope, $routeParams, Project, Milestone, WorkPackage, User) {
    var projectId = $routeParams.projectId.toLowerCase();

    Project.get({id: projectId}, function(project) {
      $scope.project = project;
      $scope.milestone = {
        wpDependencies: [],
        msDependencies: [],
        completionPercentage: 0,
        status: 'open',
        priority: 'low',
        dueDate: null
      };

      PJS.Controllers.updateRelations($scope, $scope.milestone, 'wpDependencies', WorkPackage);
      PJS.Controllers.updateRelations($scope, $scope.milestone, 'msDependencies', Milestone);

      // TODO: filter these based on what's already chosen
      $scope.workPackagesList = WorkPackage.query({projectId: projectId, list: true});
      $scope.milestonesList = Milestone.query({projectId: projectId, list: true});

      $scope.type = 'Add';
      $scope.submitType = 'Create';

      $scope.updateMilestone = function() {
        var milestone = new Milestone($scope.milestone);
        milestone.projectId = projectId;
        milestone.wpDependencies = [];
        $scope.milestone.wpDependencies.forEach(function(workPackage, index) {
          milestone.wpDependencies[index] = {wkPackage: workPackage};
        });
        milestone.$save(milestone, function(milestone) {
          window.location = '/#/projects/' + projectId + '/milestones/' + (milestone._id || '');
        });
      };
    });
  },

  update: function($scope, $routeParams, Project, Milestone, WorkPackage, User) {
    var projectId = $routeParams.projectId.toLowerCase();
    var milestoneId = $routeParams.milestoneId.toLowerCase();
    Project.get({id: projectId}, function(project) {
      $scope.project = project;
      Milestone.get({projectId: projectId, id: milestoneId}, function(milestone) {
        $scope.milestone = milestone;
        PJS.Controllers.relations('Milestone', project, milestone);

        PJS.Controllers.updateRelations($scope, $scope.milestone, 'wpDependencies', WorkPackage);
        PJS.Controllers.updateRelations($scope, $scope.milestone, 'msDependencies', Milestone);

        milestone.wpDependencies.forEach(function(workPackage, index) {
          milestone.wpDependencies[index] = workPackage.wkPackage ? workPackage.wkPackage : workPackage;
        });

        // TODO: filter these based on what's already chosen
        $scope.workPackagesList = WorkPackage.query({projectId: projectId, list: true});
        $scope.milestonesList = Milestone.query({projectId: projectId, list: true});

        $scope.type = 'Edit';
        $scope.submitType = 'Update';
        $scope.milestone.status = $scope.milestone.status.type || $scope.milestone.status;

        $scope.updateMilestone = function() {
          milestone.title = $scope.milestone.title;
          milestone.description = $scope.milestone.description;
          milestone.msDependencies = $scope.milestone.msDependencies;
          var wpDependencies = $scope.milestone.wpDependencies;
          milestone.wpDependencies = [];
          wpDependencies.forEach(function(workPackage, index) {
            milestone.wpDependencies.push({wkPackage: workPackage});
          });
          milestone.completionPercentage = $scope.milestone.completionPercentage;
          milestone.status = $scope.milestone.status;
          milestone.priority = $scope.milestone.priority;
          milestone.projectId = projectId;
          milestone.$save(milestone, function(milestone) {
            window.location = '/#/projects/' + projectId + '/milestones/' + milestone._id;
          });
        };
      });
    })
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