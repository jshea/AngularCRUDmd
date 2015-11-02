/*
 * Controller for the new person page.
 */

(function() {

   "use strict";

   function NewController($scope, $location, httpFactory, toaster) {
      $scope.person = {};

      // Save our changes and display a view of the new data
      $scope.save = function () {
         httpFactory.add($scope.person,
            // WS Success
            function(id) {
               toaster.pop("success", "Changes saved", "Your data has been saved", 2000);
               $location.path("/view/" + id);
            },
            // WS Failure
            function (url) {
               toaster.pop("error", "Web Service call failed", "save " + url + " failed.");
            }
         );
      };
   };

   // Register our controller
   angular.module("angularcrud")
   .controller("NewController", ["$scope", "$location", "httpFactory", "toaster", NewController]);
})();
