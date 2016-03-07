# Patterns and Practices
This currently is a set of patterns and coding practices you will find in this application.

## User notification of WS call success/failure
```javascript
// Save button handler - Save changes and switch to view screen for this document
$scope.save = function () {
   httpFactory.update($scope.contact,
      function(id) {
         toaster.pop("success", "Changes saved", "Your review changes have been saved", 2000);
         $location.path("/view/" + id);
      },
      // WS Failure
      function (url) {
         toaster.pop("error", "Web Service call failed", "save " + url + " failed.");
      }
   });
};
```


## WS call - handling success/failure
```javascript
/**
 *
 * @param {type} id
 * @param {type} successCallback
 * @returns {undefined}
 */
getById: function (id, successCallback, failureCallback) {
   $rootScope.myPromise =
      $http.get($rootScope.RESTURL + id)
         .success(function(data) {
            successCallback(data);
         })
         .error(function (data, status, headers, config) {
            console.log("httpFactory.getById() Error: " + data);
            failureCallback(config.url);
         });
}
```
