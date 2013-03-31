'use strict';

// Expose PJS as the only global object.
this.PJS = {
  Controllers: {},
  Utilities: {},
  ViewModels: {}
};

(function() {

// AngularJS routing for each pages. Links to controllers.
angular.module('ProjectJS', ['ProjectJS.filters', 'ProjectJS.services', 'ProjectJS.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/users/login', {templateUrl: 'partials/login.html', controller: PJS.Controllers.login});
    $routeProvider.when('/users/logout', {templateUrl: 'partials/logout.html', controller: PJS.Controllers.logout});
    $routeProvider.when('/users/register', {templateUrl: 'partials/register.html', controller: PJS.Controllers.register});
    $routeProvider.when('/users/:userId', {templateUrl: 'partials/user.html', controller: PJS.Controllers.User.get});
    $routeProvider.when('/projects', {templateUrl: 'partials/projects.html', controller: PJS.Controllers.Project.list});
    $routeProvider.when('/projects/:projectId', {templateUrl: 'partials/project.html', controller: PJS.Controllers.Project.getMain});
    $routeProvider.when('/add-project', {templateUrl: 'partials/add-project.html', controller: PJS.Controllers.Project.add});
    $routeProvider.when('/projects/:projectId/users', {templateUrl: 'partials/project-users.html', controller: PJS.Controllers.ProjectUser.update});
    $routeProvider.when('/projects/:projectId/work-breakdown', {templateUrl: 'partials/workbreakdown.html', controller: PJS.Controllers.WorkBreakdown.list});
    $routeProvider.when('/projects/:projectId/add-work-breakdown', {templateUrl: 'partials/add-workbreakdown.html', controller: PJS.Controllers.WorkBreakdown.add});
    $routeProvider.when('/projects/:projectId/milestones', {templateUrl: 'partials/milestones.html', controller: PJS.Controllers.Milestone.list});
    $routeProvider.when('/projects/:projectId/milestones/:milestoneId', {templateUrl: 'partials/milestone.html', controller: PJS.Controllers.Milestone.get});
    $routeProvider.when('/projects/:projectId/add-milestone', {templateUrl: 'partials/add-milestone.html', controller: PJS.Controllers.Milestone.add});
    $routeProvider.when('/projects/:projectId/work-packages', {templateUrl: 'partials/workpackages.html', controller: PJS.Controllers.WorkPackage.list});
    $routeProvider.when('/projects/:projectId/work-packages/:workPackageId', {templateUrl: 'partials/workpackage.html', controller: PJS.Controllers.WorkPackage.get});
    $routeProvider.when('/projects/:projectId/add-work-package', {templateUrl: 'partials/add-workpackage.html', controller: PJS.Controllers.WorkPackage.add});
    $routeProvider.when('/projects/:projectId/work-items', {templateUrl: 'partials/workitems.html', controller: PJS.Controllers.WorkItem.list});
    $routeProvider.when('/projects/:projectId/work-items/:workItemId/:mode', {templateUrl: 'partials/workitem.html', controller: PJS.Controllers.WorkItem.get});
    $routeProvider.when('/projects/:projectId/work-items/:workItemId', {templateUrl: 'partials/workitem.html', controller: PJS.Controllers.WorkItem.get});
    $routeProvider.when('/projects/:projectId/add-work-item', {templateUrl: 'partials/add-workitem.html', controller: PJS.Controllers.WorkItem.add});
    $routeProvider.otherwise({redirectTo: '/projects'});
  }]);

})();