/*
 * Controller for reinitializing the database.
 */
(function() {

   'use strict';

   function LoadController($location, httpFactory, toaster) {

      // Save a pointer to our current context
      var self = this;

      // Delete all existing data and reload our sample data
      httpFactory.updateAll(
         // WS Success
         function (response) {
            $location.path('/');
         },
         // WS Failure
         function (response) {
            toaster.pop('error', 'Web Service call failed', 'getAll ' + response.config.url + ' failed.');
         }
      );
   };

   // Register our controller
   angular
      .module('angularcrud')
      .controller('LoadController', ['$location', 'httpFactory', 'toaster', LoadController]);
})();
