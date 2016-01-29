/*
 * Controller for reinitializing the database.
 */

(function() {

   'use strict';

   function LoadController($scope, $location, httpFactory, toaster) {

      // Save a pointer to our current context
      var self = this;

      // Delete all existing data and reload our sample data
      httpFactory.updateAll(
         // WS Success
         function () {
            $location.path('/');
            $scope.$apply();
         },
         // WS Failure
         function (url) {
            toaster.pop('error', 'Web Service call failed', 'getAll ' + url + ' failed.');
         }
      );
   };

   // Register our controller
   angular.module('angularcrud')
   .controller('LoadController', ['$scope', '$location', 'httpFactory', 'toaster', LoadController]);
})();
