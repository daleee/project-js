(function() {

PJS.Controllers.WorkItem = {
  relations: {
    'dependencies': {list: 'workItems', type: 'WorkItem'},
    'workPackages': {list: 'workPackages', type: 'WorkPackage'}
  },

  list: function($scope, $routeParams, WorkItem, Project) {
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
    });
  },

  add: function($scope, $routeParams, WorkItem, Project) {
    var projectId = $routeParams.projectId.toLowerCase();
    $scope.addWorkItem = function() {
      var workItem = new WorkItem($scope.workItem);
      workItem.$save(workItem, function(workItem) {
        window.location = '/#/projects/' + projectId + '/work-items/' + workItem._id + '/edit';
      });
    };
  },

  update: function($scope, $routeParams, WorkItem, Project, WorkPackage, User){
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

  addComment: function($scope, $routeParams, WorkItem, Project){
    var projectId = $routeParams.projectId.toLowerCase();
    var workItemId = $routeParams.workItemId.toLowerCase();
    Project.get({id: projectId}, function(project) {
      $scope.project = project;
      WorkItem.get({projectId: projectId, id: workItemId}, function(workItem) {
        $scope.addComment = function() {
          //TODO: Update these attributes for new comments or change around so that the API handles it
          //newComment.commentNumber=;
          //newComment.postedBy='someperson';
          //newComment.datePosted=Date.now();
          newComment.title=$scope.newComment.title;
          newComment.text=$scope.newComment.text;
          workItem.comments.unshift(newComment);
          workItem.$save(workItem);
        };
      });
    })
  }
};

})();