PJS.Controllers.WorkBreakdown = {
  list: function($scope, $routeParams, WorkBreakdown, Project) {
    Project.get({id: $routeParams.projectId.toLowerCase()}, function(project) {
      WorkBreakdown.get({projectId: project._id}, function(flatWorkBreakdown){
        $scope.workBreakdown = [];

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
              //TODO: Make sure that _id is actually a primitive string or something that can be compared like this
              if(workBreakdown[currentIndex].children[childIndex] === workBreakdown[currentIndex+1]._id){
                workBreakdown[currentIndex].children[childIndex] = workBreakdown[currentIndex+1];
                currentIndex = replaceIDsWithChildren(workBreakdown, currentIndex+1);
              }else{
                //The child isn't where it's supposed to be, so we must find it and put it in the right location, and
                //instruct the server to do the same.
                //This code should NOT be getting called frequently unless there are a lot of people editing
                //the work breakdown structure at the same time for some reason.
                //It wouldn't even be necessary if mongoDB could just store a tree
                for (var searchIndex = 0; searchIndex < workBreakdown.length; searchIndex++){
                  if (workBreakdown[startIndex].children[childIndex] == workBreakdown[searchIndex]._id){
                    //We found it, splice into currentIndex + 1;
                    workBreakdown.splice(currentIndex + 1, 0, workBreakdown[searchIndex]);
                    if (currentIndex + 1 < searchIndex){
                      searchIndex++;
                    }else{
                      searchIndex--;
                    }
                    workBreakdown.splice(searchIndex, 1);
                    //TODO: Tell the server to put the item with id of workBreakdown[currentIndex+1]._id after
                    //the item with id of workBreakdown[currentIndex]._id

                    //Leave this loop and make the child loop up above try the current child again
                    searchIndex = workBreakdown.length;
                    childIndex--;
                  }
                }
              }
              replaceIDsWithChildren(workBreakdown, currentIndex + 1, errorList);
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
            $scope.workBreakdown.push(flatWorkBreakdown[wbIndex]);
            wbIndex = skipAheadPoint + 1;
          }else{
            $scope.workBreakdown.push(flatWorkBreakdown[wbIndex]);
            wbIndex++;
          }
        }
      });

      //TODO: Make this delete the item associated with data
      $scope.delete = function(data) {

      };
      $scope.add = function(data) {
        var newItem = new WorkBreakdown({title: data.newItem.title, description: data.newItem.description});
        newItem.$save(newItem, function(newItem){
          data.children.push(newItem);
          //TODO: Make sure that this actually is a resource
          //TODO: Check the update methods- if they can't handle getting an object instead of an ID in the children, add that capability
          data.$save();
        });
      };
    });
  },
  treeInit: function($scope){
    $scope.mode = "view";
    $scope.showDescription = false;
    $scope.newItem = {};
  }
};