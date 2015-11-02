/*
 * Controller for the view details page.
 */

(function() {

   "use strict";

   function ViewController($scope, $location, $routeParams, httpFactory, toaster) {

      // Initialize our data based on id parameter
      httpFactory.getById($routeParams.id,
         function (data) {
            $scope.person = data;
         },
         // WS Failure
         function (url) {
            toaster.pop("error", "Web Service call failed", "save " + url + " failed.");
         }
      );

      // Handler for remove button
      $scope.remove = function () {
         httpFactory.delete($scope.person.id,
            function() {
               toaster.pop("success", "Changes saved", "Item deleted", 2000);
               $location.path("/");
            },
            // WS Failure
            function (url) {
               toaster.pop("error", "Web Service call failed", "save " + url + " failed.");
            }
         );
      };

      // Handler for edit button
      $scope.edit = function () {
         $location.path("/edit/" + $scope.person.id);
      };
   };

   // Register our controller
   angular.module("angularcrud")
   .controller("ViewController", ["$scope", "$location", "$routeParams", "httpFactory", "toaster", ViewController]);
})();
