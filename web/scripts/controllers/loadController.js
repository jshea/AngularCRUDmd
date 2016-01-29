/*
 * Controller for reinitializing the database.
 */

(function() {

   'use strict';

   function LoadController($rootScope, $location, httpFactory, toaster) {

      // Save a pointer to our current context
      var self = this;

      // Delete all existing data and reload our sample data
      httpFactory.updateAll(
         // WS Success
         function (data) {
            $location.path('/');
            $rootScope.$apply();
         },
         // WS Failure
         function (url) {
            toaster.pop('error', 'Web Service call failed', 'getAll ' + url + ' failed.');
         }
      );
   };

   // Register our controller
   angular.module('angularcrud')
   .controller('LoadController', ['$rootScope', '$location', 'httpFactory', 'toaster', LoadController]);
})();
