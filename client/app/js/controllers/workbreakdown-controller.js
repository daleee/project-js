PJS.Controllers.WorkBreakdown = {
  list: function($scope, $routeParams, WorkBreakdown, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.workBreakdown = WorkBreakdown.query({projectId: project._id});
      $scope.delete = function(data) {
        data.items = [];
      };
      $scope.add = function(data) {
        var post = data.items.length + 1;
        var newName = data.newItem.description + '-' + post;
        data.items.push({name: newName,items: []});
      };
    });
  },
  treeInit: function($scope){
    $scope.mode = "view";
  }
};