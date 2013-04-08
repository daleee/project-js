(function() {

PJS.Controllers.User = {
  get: function($scope, $routeParams, User) {
    User.get({id: $routeParams.userId.toLowerCase()}, function(user) {
      $scope.user = user;
    });
  },

  login: function($scope, $routeParams, $location, Login) {
    PJS.Controllers.all($scope, $routeParams, Login);
    $scope.login = function() {
      var login = new Login({id: $scope.username, password: $scope.password});
      login.$save({username: $scope.username, password: $scope.password}, function(loggedInUser) {
        window.location.reload(true);
      });
    };
  },

  logout: function($http) {
    $http({method: 'GET', url: '/api/logout'});
    window.location = '/';
  },

  add: function($scope, $routeParams, User) {
    $scope.register = function() {
      var user = new User({
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        email: $scope.email
      });
      user.$save(function(loggedInUser) {
        $scope.loggedIn = loggedInUser;
      });
    };
  }
};

})();
