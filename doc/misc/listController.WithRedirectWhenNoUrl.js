/*
 * Controller for the listing page.
 */

(function() {

   "use strict";

   function ListController($scope, httpFactory, toaster, $location,  WS_URL) {

      // Get all data and show it in a list.
      //
      // Show the settings page if the web service url isn't established.
      if (WS_URL === null) {
         $location.path("/settings");
      }
      else {
         httpFactory.getAll(
            // WS Success
            function (data) {
               $scope.people = data;
            },
            // WS Failure
            function (url) {
               toaster.pop("error", "Web Service call failed", "getAll " + url + " failed.");
            }
         );
      }
   };

   // Register our controller
   angular.module("angularcrud")
   .controller("ListController", ["$scope", "httpFactory", "toaster",  "$location", "WS_URL", ListController]);
})();
