PJS.Controllers.WorkBreakdown = {
  list: function($scope, $routeParams, WorkBreakdown, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.workBreakdown = WorkBreakdown.query({projectId: project._id});
      //TODO: Make this delete the item it is beside instead of the child items
      $scope.delete = function(data) {
        data.children = [];
      };
      $scope.add = function(data) {
        var newItem = new WorkBreakdown({title: data.newItem.title, description: data.newItem.description});
        newItem.$save();
        data.children.push(newItem);
        //TODO: Make sure that this actually is a resource
        data.$save();
      };
    });
  },
  treeInit: function($scope){
    $scope.mode = "view";
    $scope.showDescription = false;
    $scope.newItem = {};
  }
};