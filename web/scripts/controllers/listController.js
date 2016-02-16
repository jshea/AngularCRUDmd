/*
 * Controller for the listing page.
 */

(function() {

   'use strict';

   function ListController(httpFactory, toaster, PersonListService) {

      // Save a pointer to our current context
      var self = this;
      self.personListService = PersonListService;

      // Get all data and show it in a list
      httpFactory.getAll(
         // WS Success
         function (data) {
            self.personListService.init(data);
         },
         // WS Failure
         function (response) {
            toaster.pop('error', 'Web Service call failed', 'getAll ' + response.config.url + ' failed.');
         }
      );
   };

   // Register our controller
   angular.module('angularcrud')
      .controller('ListController', ['httpFactory', 'toaster', 'PersonListService', ListController]);
})();
