(function() {

PJS.Controllers.User = {
  get: function($scope, $routeParams, User) {
    User.get({id: $routeParams.userId.toLowerCase()}, function(user) {
      $scope.user = user;
    });
  }
};

})();