# Supporting offline operations
This currently is a set of code snippets that were used to support offline operation. This is just a holding area so I don't lose this code.

## Getting data (edit) - Save local copy
```javascript
   httpFactory.getAll(function (data) {
      $scope.contacts = data;

      // Save the retrieved data locally in case we go offline
      if ($scope.online) {
         localforage.setItem($rootScope.RESTURL, data, function(err, value) { });
      }
      else {
         // We are offline. localForage operations happen outside of Angular's view, tell Angular data changed
         $scope.$apply();
      }
   });
```

## Saving data (??)
```javascript
   httpFactory.getById($routeParams.id, function (data) {
      $scope.contact = data;

      // We are offline. Localforage operations happen outside of Angular's view, tell Angular data changed
      if (!$scope.online) {
         $scope.$apply();
      }
   });
```

## View
```javascript
   httpFactory.getById($routeParams.id, function (data) {
      $scope.contact = data;

      // We are offline. Localforage operations happen outside of Angular's view, tell Angular data changed
      if (!$scope.online) {
         $scope.$apply();
      }
   });
```