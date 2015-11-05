/*
 * Controller for the listing page.
 */

(function() {

   "use strict";

   function ListController($scope, $location, httpFactory, toaster) { // WS_URL, needed for dependency injection

      // Get all data and show it in a list.
      //
      // Show the settings page if the web service url isn't established.
//      if (WS_URL === null) {
//         $location.path("/settings");
//      }
//      else {
         httpFactory.getAll(
            // WS Success
            function (data) {
               $scope.persons = data;
            },
            // WS Failure
            function (url) {
               toaster.pop("error", "Web Service call failed", "getAll " + url + " failed.");
            }
         );
//      }
   };

   // Register our controller
   angular.module("angularcrud") // "WS_URL", needed for dependency injection
   .controller("ListController", ["$scope", "$location", "httpFactory", "toaster", ListController]);
})();
