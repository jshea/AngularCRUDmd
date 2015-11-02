/*
 * Controller for the listing page.
 */

(function() {

   "use strict";

   function ListController(WS_URL, $scope, $location, httpFactory, toaster) {

      // Get all data and show it in a list. If the web service url isn't established
      // show settings page.
      if (WS_URL === null) {
         $location.path("/settings");
      }
      else {
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
      }
   };

   // Register our controller
   angular.module("angularcrud")
   .controller("ListController", ["WS_URL", "$scope", "$location", "httpFactory", "toaster", ListController]);
})();
