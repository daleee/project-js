PJS.Controllers.WorkItem = {
  list: function($scope, $routeParams, WorkItem, Project) {
    $scope.project = Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.workItems = WorkItem.query({projectId: $scope.project._id});
    });
  },
  get: function($scope, $routeParams, WorkItem, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.workItem = WorkItem.get({projectId: PJS.ViewModels.project(project)._id, workItemId: $routeParams.workItemId});
      $scope.mode = $routeParams.mode;
    });
  },
  add: function($scope, $routeParams, WorkItem, Project) {
    var projectId = $routeParams.projectId.toLowerCase();
    $scope.addWorkItem = function() {
      var workItem = new WorkItem($scope.workItem);
      workItem.$save(workItem);
      window.location = '/#/projects/' + projectId + '/workitem/' + workItem._id + '/edit';
    };
  },
  update: function($scope, $routeParams, WorkItem, Project){
    var projectId = $routeParams.projectId.toLowerCase();
    var workItemId = $routeParams.workItemId.toLowerCase();
    Project.get({id: projectId}, function(project) {
      $scope.project = PJS.ViewModels.project(project);
      WorkItem.get({projectId: projectId, id: workItemId}, function(workItem) {
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
          workItem.$save(workItem);
        };
      });
    })
  },
  addComment: function($scope, $routeParams, WorkItem, Project){
    var projectId = $routeParams.projectId.toLowerCase();
    var workItemId = $routeParams.workItemId.toLowerCase();
    Project.get({id: projectId}, function(project) {
      $scope.project = PJS.ViewModels.project(project);
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