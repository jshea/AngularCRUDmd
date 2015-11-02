
/* global toaster */

/*
 * Controller for the edit page.
 */
(function() {

   "use strict";

   function EditController($scope, $routeParams, $location, httpFactory, toaster) {

      // Initialize our data to the document with key of $routeParams.id
      httpFactory.getById($routeParams.id,
         function (data) {
            $scope.person = data;
         },
         // WS Failure
         function (url) {
            toaster.pop("error", "Web Service call failed", "save " + url + " failed.");
         }
      );

      // Delete button handler - Delete document and return to main scren
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

      // Save button handler - Save changes and switch to view screen for this document
      $scope.save = function () {
         httpFactory.update($scope.person,
            function(id) {
               toaster.pop("success", "Changes saved", "Your review changes have been saved", 2000);
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
   .controller("EditController", ["$scope", "$routeParams", "$location", "httpFactory", "toaster", EditController]);
})();
