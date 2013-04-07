(function() {

PJS.Controllers.WorkItem = {
  relations: {
    'dependencies': {list: 'workItems', type: 'WorkItem'},
    'workPackages': {list: 'workPackages', type: 'WorkPackage'}
  },

  list: function($scope, $routeParams, WorkItem, Project) {
    $scope.hasWorkItems = true;
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.project = project;
      PJS.Controllers.allRelations('WorkItem', project, project.workItems);
      var workItems = PJS.ViewModels.each('WorkItem', project.workItems);
      $scope.status = ['open', 'late'];
      $scope.workItems = PJS.Utilities.filterByStatus(workItems, $scope.status);
      $scope.hasWorkItems = !!workItems.length;

      $scope.changeMode = function(status) {
        $scope.status = status;
        $scope.workItems = PJS.Utilities.filterByStatus(workItems, $scope.status);
      };
    });
  },

  get: function($scope, $routeParams, WorkItem, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.project = project;
      var workItem = PJS.Utilities.findInArray(project.workItems, $routeParams.workItemId.toLowerCase());
      PJS.Controllers.relations('WorkItem', project, workItem);
      $scope.workItem = PJS.ViewModels.WorkItem(workItem);

      PJS.Controllers.WorkItem.addComment($scope, $routeParams, WorkItem, Project);
    });
  },

  add: function($scope, $routeParams, WorkItem, Project, WorkPackage, User) {
    var projectId = $routeParams.projectId.toLowerCase();

    Project.get({id: projectId}, function(project) {
      $scope.project = project;
      $scope.workItem = {
        workPackages: [],
        dependencies: [],
        assignedUsers: [],
        comments: [],
        completionPercentage: 0,
        timeEstimate: 0,
        timeSpent: 0,
        startDate: Date.now,
        status: 'open'
      };

      PJS.Controllers.updateRelations($scope, $scope.workItem, 'workPackages', WorkPackage);
      PJS.Controllers.updateRelations($scope, $scope.workItem, 'dependencies', WorkItem);
      PJS.Controllers.updateRelations($scope, $scope.workItem, 'assignedUsers', User);

      // TODO: filter these based on what's already chosen
      $scope.workPackagesList = WorkPackage.query({projectId: projectId, list: true});
      $scope.dependenciesList = WorkItem.query({projectId: projectId, list: true});
      $scope.usersList = User.query({projectId: projectId, list: true});

      $scope.type = 'Add';
      $scope.submitType = 'Create';

      $scope.updateWorkItem = function() {
        var workItem = new WorkItem($scope.workItem);
        workItem.projectId = projectId;
        workItem.$save(workItem, function(workItem) {
          window.location = '/#/projects/' + projectId + '/work-items/' + (workItem._id || '');
        });
      };
    });
  },

  update: function($scope, $routeParams, WorkItem, Project, WorkPackage, User) {
    var projectId = $routeParams.projectId.toLowerCase();
    var workItemId = $routeParams.workItemId.toLowerCase();
    Project.get({id: projectId}, function(project) {
      $scope.project = project;
      WorkItem.get({projectId: projectId, id: workItemId}, function(workItem) {
        $scope.workItem = workItem;
        PJS.Controllers.relations('WorkItem', project, workItem);

        PJS.Controllers.updateRelations($scope, workItem, 'workPackages', WorkPackage);
        PJS.Controllers.updateRelations($scope, workItem, 'dependencies', WorkItem);
        PJS.Controllers.updateRelations($scope, workItem, 'assignedUsers', User);

        // TODO: filter these based on what's already chosen
        $scope.workPackagesList = WorkPackage.query({projectId: projectId, list: true});
        $scope.dependenciesList = WorkItem.query({projectId: projectId, list: true});
        $scope.usersList = User.query({projectId: projectId, list: true});

        $scope.type = 'Edit';
        $scope.submitType = 'Update';
        $scope.workItem.status = $scope.workItem.status.type || $scope.workItem.status;

        $scope.updateWorkItem = function() {
          workItem.title = $scope.workItem.title;
          workItem.description = $scope.workItem.description;
          workItem.workPackages = $scope.workItem.workPackages;
          workItem.assignedUsers = $scope.workItem.assignedUsers;
          workItem.dependencies = $scope.workItem.dependencies;
          workItem.timeEstimate = $scope.workItem.timeEstimate;
          workItem.timeSpent = $scope.workItem.timeSpent;
          workItem.completionPercentage = $scope.workItem.completionPercentage;
          workItem.status = $scope.workItem.status;
          workItem.projectId = projectId;
          workItem.$save(workItem, function(workItem) {
            window.location = '/#/projects/' + projectId + '/work-items/' + workItem._id;
          });
        };
      });
    })
  },

  addComment: function($scope, $routeParams, WorkItem, Project) {
    var projectId = $routeParams.projectId.toLowerCase();
    var workItemId = $routeParams.workItemId.toLowerCase();
    WorkItem.get({projectId: projectId, id: workItemId}, function(workItem) {
      $scope.newComment = {};

      $scope.addComment = function() {
        if ($scope.newComment && $scope.newComment.title && $scope.newComment.text) {
          workItem.comments.unshift({
            title: $scope.newComment.title,
            text: $scope.newComment.text
          });
          workItem.projectId = projectId;
          workItem.$save(workItem);
          $scope.workItem.comments = workItem.comments;
        }
      };
    });
  }
};

})();