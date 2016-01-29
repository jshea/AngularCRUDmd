/*
 * Controller for the listing page.
 */

(function() {

   'use strict';

   function ListController(httpFactory, toaster, NgTableParams) {

      // Save a pointer to our current context
      var self = this;

      // Get all data and show it in a list
      httpFactory.getAll(
         // WS Success
         function (data) {
            self.people = data;
            self.tableParams = new NgTableParams({}, { dataset: self.people});
         },
         // WS Failure
         function (response) {
            toaster.pop('error', 'Web Service call failed', 'getAll ' + response.config.url + ' failed.');
         }
      );
   };

   // Register our controller
   angular.module('angularcrud')
   .controller('ListController', ['httpFactory', 'toaster', 'NgTableParams', ListController]);
})();
