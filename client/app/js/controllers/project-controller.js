(function() {

PJS.Controllers.Project = {
  lightList: function($scope, $routeParams, Project, User, Role) {
    $scope.projectsList = Project.query({list: true});
  },

  list: function($scope, $routeParams, Project, User, Role) {
    $scope.hasProjects = true;
    $scope.projects = Project.query(function(projects) {
      $scope.hasProjects = !!projects.length;
      $scope.projects.forEach(function(project) {
        project.usersByRole = PJS.Controllers.ProjectUser.usersByRole(project.projectUsers);
      });
    });
  },

  getMain: function($scope, $routeParams, Project, User, Role) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      project.usersByRole = PJS.Controllers.ProjectUser.usersByRole(project.projectUsers);
      $scope.project = project;
      $scope.upcomingMilestones = project.milestones.sort(function(a, b) {
        return a.dueDate > b.dueDate ? -1 : 1;
      }).splice(0, 5);
      $scope.latestIssues = project.workItems.sort(function(a, b) {
        return a.lastModifiedDate > b.lastModifiedDate ? -1 : 1;
      }).splice(0, 5);
    });
  },

  get: function($scope, $routeParams, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.project = project;
    });
    $scope.setSelectedOptionProject = setSelectedOptionProject;
    $scope.currentProjectCategory = PJS.Controllers.Project.getCurrentCategory();
  },

  add: function($scope, $routeParams, Project) {
    $scope.type = 'Add';
    $scope.submitType = 'Create';

    $scope.project = {
      title: '',
      description: '',
      projectDueDate: null,
      clientName: '',
      status: 'open',
      completionPercentage: 0
    };

    $scope.updateProject = function() {
      var project = new Project($scope.project);
      project.$save(project, function(project) {
        window.location = '/#/projects/' + project._id;
        window.location.reload(true);
      });
    };
  },

  update: function($scope, $routeParams, Project) {
    $scope.type = 'Edit';
    $scope.submitType = 'Update';
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      $scope.project = project;
      $scope.project.status = $scope.project.status.type || $scope.project.status;

      $scope.updateProject = function() {
        project.title = $scope.project.title;
        project.description = $scope.project.description;
        project.projectDueDate = $scope.project.projectDueDate;
        project.clientName = $scope.project.clientName;
        project.status = $scope.project.status;
        project.completionPercentage = $scope.project.completionPercentage;

        project.$save(project, function(project) {
          window.location = '/#/projects/' + project._id;
          window.location.reload(true);
        });
      };
    });
  },

  remove: function($scope, $routeParams, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      project.$remove(project);
      window.location = '/#/projects/';
    });
  },

  getCurrentCategory: function() {
    var href = window.location.href;
    var activeChosen = false;
    var current = {};
    categories.forEach(function(category) {
      if (href.indexOf(category) !== -1) {
        current[category] = 'active';
        activeChosen = true;
      } else {
        current[category] = 'inactive';
      }
    });
    if (!activeChosen) {
      current.dashboard = 'active';
    }
    return current;
  }
};

var categories = ['dashboard','users','work-breakdown','work-packages','work-items','milestones'];

var setSelectedOptionProject = function(project) {
  if (project) {
    var selectMenu = document.getElementById('projects-menu');
    PJS.Utilities.setSelectedOption(selectMenu, project.title);
  }
};

})();