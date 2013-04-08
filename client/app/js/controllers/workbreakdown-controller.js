PJS.Controllers.WorkBreakdown = {
  list: function($scope, $routeParams, $http, WorkBreakdown, Project) {
    var projectId = $routeParams.projectId.toLowerCase();
    Project.get({id: projectId}, function(project) {
      WorkBreakdown.query({projectId: project._id}, function(flatWorkBreakdown){
        var workBreakdown = [];

        //This is a recursive function that replaces the IDs of the children of workBreakdown[startIndex]
        //with the actual objects from further in the list.
        //It returns the highest index that it reached during the course of all its recursing.
        function replaceIDsWithChildren(workBreakdown, startIndex){
          var currentIndex = startIndex;
          if (workBreakdown[startIndex].children){
            //The first child should be at startIndex+1. With each child that we add in we'll do a
            //recursion to put all of its children,grandchildren,etc. together
            //That recursion should give us the index immediately before the next child, allowing us to loop again
            for (var childIndex = 0; childIndex < workBreakdown[startIndex].children.length; childIndex++){

              if(workBreakdown[currentIndex+1] && (workBreakdown[startIndex].children[childIndex] === workBreakdown[currentIndex+1]._id)){
                workBreakdown[startIndex].children[childIndex] = workBreakdown[currentIndex+1];
                currentIndex = replaceIDsWithChildren(workBreakdown, currentIndex+1);
              }else{
                //The child isn't where it's supposed to be, so we must find it and put it in the right location, and
                //instruct the server to do the same.
                //This code should NOT be getting called frequently unless there are a lot of people editing
                //the work breakdown structure at the same time for some reason.
                //It wouldn't even be necessary if mongoDB could just store a tree
                var foundItem = false;
                for (var searchIndex = 0; searchIndex < workBreakdown.length; searchIndex++){
                  if (workBreakdown[startIndex].children[childIndex] == workBreakdown[searchIndex]._id){
                    foundItem = true;
                    //We found it, splice into currentIndex + 1;
                    workBreakdown.splice(currentIndex + 1, 0, workBreakdown[searchIndex]);
                    console.log("Object misplaced! Supposed to be at " + (currentIndex + 1) +", was at " + searchIndex);
                    if (currentIndex + 1 < searchIndex){
                      searchIndex++;
                    }else{
                      //TODO: If this line of code is reached there's a good chance that a child object got added as a top level object and will, as a result, appear twice in the tree. We should add some way of fixing this, but it's kind of an edge case so I'm not doing it right now.
                    }
                    workBreakdown.splice(searchIndex, 1);
                    $http.post('api/projects/' + projectId + '/workbreakdown/move', {source: workBreakdown[currentIndex+1], appendAfter: workBreakdown[currentIndex]}).success(function(){
                      "Misplaced item successfully moved on the server"
                    });

                    //Leave this loop and make the child loop up above try the current child again
                    searchIndex = workBreakdown.length;
                    childIndex--;
                  }
                }
                if (!foundItem){
                  console.log("Deleted empty child entry")
                  workBreakdown[startIndex].children.splice(childIndex, 1);
                  workBreakdown[startIndex].projectId = projectId;
                  workBreakdown[startIndex].$save(workBreakdown[startIndex]);
                  //Sigh. AngularJS will screw up if we cut out a child in the middle of things, it appears.
                  //So we reload the page after deleting stuff and everything should be fine.
                  window.location = '/#/projects/' + projectId + '/work-breakdown/';

                  //This line will never be reached, but is being left in in case the above angularJS issue gets fixed
                  // and the double page reload becomes unnecessary
                  //We're splicing a child out of the array, so we have to reduce the child index by 1 or we'll
                  //end up skipping one
                  childIndex--;
                }
              }
            }
          }
          return currentIndex;
        }

        var wbIndex = 0;
        while(wbIndex < flatWorkBreakdown.length){
          if (flatWorkBreakdown[wbIndex].children){
            //ReplaceIDsWithChildren will return the farthest point in the array that it got to.
            //This allows us to skip all the parts that already got recursively added
            var skipAheadPoint = replaceIDsWithChildren(flatWorkBreakdown, wbIndex);
            workBreakdown.push(flatWorkBreakdown[wbIndex]);
            wbIndex = skipAheadPoint + 1;
          }else{
            workBreakdown.push(flatWorkBreakdown[wbIndex]);
            wbIndex++;
          }
        }
        $scope.data = {};
        $scope.data.children = workBreakdown;
        $scope.newItem = {};
        $scope.updatedItem = {};
        $scope.mode = "view";
      });

      $scope.delete = function(data) {
        data.projectId = projectId;
        data.$delete(data, function(){
          window.location = '/#/projects/' + projectId + '/work-breakdown/';
        });
      };
      $scope.addChildren = function(data, item) {
        var description = item.description || "";
        var newItem = new WorkBreakdown({title: item.title, description: description});
        newItem.projectId = projectId;
        newItem.$save(newItem, function(newItem){
          if (!data.children){
            data.children = [];
          }
          data.children.push(newItem);
          //The $save function is going to replace our children with their IDs, so we can just make a copy
          //of them and replace them
          var childrenCopy = data.children.slice(0);
          data.projectId = projectId;
          data.$save(data, function(data){
            data.children = childrenCopy;
            var bottomLevelObject;
            if (data.children.length === 1){
              bottomLevelObject = data;
            }else{
              bottomLevelObject = data.children[data.children.length-2];
              //Get the child item that we want to be directly before our new item.
              while(bottomLevelObject.children.length > 0){
                bottomLevelObject = bottomLevelObject.children[bottomLevelObject.children.length-1];
              };
            }
            $http.post('api/projects/' + projectId + '/workbreakdown/move', {source: newItem, appendAfter: bottomLevelObject}).success(function(){});
          });
        });
      };

      $scope.update = function(data, item){
        data.title = item.title;
        data.description = item.description;
        data.projectId = projectId;
        var childrenCopy = data.children.slice(0);
        data.$save(data, function(){
          data.children = childrenCopy;
        });
      };

      $scope.add = function(data, item) {
        var description = item.description || "";
        var newItem = new WorkBreakdown({title: item.title, description: description});
        newItem.projectId = projectId;
        newItem.$save(newItem, function(newItem){
          if (!data.children){
            data.children = [];
          }
          data.children.push(newItem);
        });
      };

    });
  },
  treeInit: function($scope){
    $scope.mode = "view";
    $scope.showDescription = false;
    $scope.newItem = {};
    $scope.updatedItem = {};
  }
};