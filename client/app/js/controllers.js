(function() {

'use strict';

PJS.Controllers = {
  all: function($scope, $routeParams, Login) {
    Login.get(function(user) {
      $scope.user = user;
      $scope.user.name = $scope.user._id;
      $scope.loggedIn = !!$scope.user;
    });
  },

  nav: function($scope, $routeParams, Login) {
    PJS.Controllers.all($scope, $routeParams, Login);
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

  register: function($scope, $routeParams, User) {
    $scope.register = function() {
      /*User.get({id: $scope.username, password: $scope.password}, function(loggedInUser) {
        user = loggedInUser;
      });*/
    };
  }
};

})();