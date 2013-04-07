'use strict';

var directives = angular.module('ProjectJS.directives', []);

directives.directive('select2', function() {
   return function(scope, element, attrs) {
      element.select2();
      scope.$on('$routeChangeSuccess', function(event, routeData) {
        $('.select2-drop').detach();
        $('.select2-drop-mask').detach();
      });
   }
});
