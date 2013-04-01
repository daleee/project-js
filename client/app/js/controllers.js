(function() {

'use strict';

PJS.Controllers = {
  all: function($scope, $routeParams, Login) {
//    Login.get(function(user) {
//      $scope.user = user;
//      $scope.user.name = $scope.user._id;
//      $scope.loggedIn = !!$scope.user;
    $scope.loggedIn = false;
//    });
  },

  nav: function($scope, $routeParams, Login, Project) {
    PJS.Controllers.all($scope, $routeParams, Login);
    $scope.projectsList = Project.query({list: true});

    $scope.changeProject = function() {
      if ($scope.projectChosen) {
        window.location = '/#/projects/' + $scope.projectChosen._id;
      }
    };
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
  },

  relations: function(controllerName, project, model) {
    if (!model) return
    var Controller = PJS.Controllers[controllerName];
    if (Controller.relations) {
      for (var key in Controller.relations) {
        if (Controller.relations.hasOwnProperty(key)) {
          var relation = Controller.relations[key];
          var type = relation.type, listName = relation.list, inner = relation.inner;
          var list = project[listName];
          if (!model[key]) continue;
          model[key].forEach(function(id, index) {
            if (inner) {
              id = id[inner];
            }
            if (id && typeof id === 'string') {
              if (inner) {
                model[key][index][inner] = PJS.ViewModels[type](PJS.Utilities.findInArray(list, id));
              } else {
                model[key][index] = PJS.ViewModels[type](PJS.Utilities.findInArray(list, id));
              }
            }
          });
        }
      }
    }
    if (Controller.reverseRelations) {
      this.reverseRelations(controllerName, project, model);
    }
  },

  reverseRelations: function(controllerName, project, model) {
    var Controller = PJS.Controllers[controllerName];
    if (Controller.reverseRelations) {
      for (var key in Controller.reverseRelations) {
        if (Controller.reverseRelations.hasOwnProperty(key)) {
          var type = Controller.reverseRelations[key].type;
          var listName = Controller.reverseRelations[key].list;
          var relation = Controller.reverseRelations[key].relation;
          var list = project[listName];
          model[key] = [];
          list.forEach(function(item) {
            item[relation].forEach(function(id, index) {
              if (typeof id === 'string' && id === model._id) {
                model[key].push(PJS.ViewModels[type](item));
              }
            })
          });
        }
      }
    }
  },

  allRelations: function(controllerName, project, list) {
    list.forEach(function(model) {
      PJS.Controllers.relations(controllerName, project, model);
    });
  },

  updateRelations: function($scope, model, key, Related, shouldSave) {
    var projectId = $scope.project._id;
    var list = model[key];

    $scope[key + 'Add'] = function() {
      var id = $scope[key + 'AddChosen']._id;
      var index = PJS.Utilities.findIndexInArray(list, id);
      if (index === -1) {
        Related.get({projectId: projectId, id: id}, function(related) {
          list.push(related);
          if (shouldSave) {
            model.projectId = projectId;
            model.$save(model);
          }
        });
      }
    };

    $scope[key + 'Remove'] = function(related) {
      var index = PJS.Utilities.findIndexInArray(list, related._id);
      if (index !== -1) {
        list.splice(index, 1);
        if (shouldSave) {
          model.projectId = projectId;
          model.$save(model);
        }
      }
    };
  }
};

})();