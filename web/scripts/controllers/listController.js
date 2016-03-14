/*
 * Controller for the listing page.
 */
(function() {

   'use strict';

   function ListController(httpFactory, UtilityService) {

      // Save a pointer to our current context
      var self = this;

      // Get all data and show it in a list
      httpFactory.getAll(
         // WS Success
         function (data) {
            self.personListData = data;
         },
         // WS Failure
         function (response) {
            UtilityService.showToastError('Web Service call failed - getAll ' + response.config.url + ' failed.');
         }
      );
   };

   // Register our controller
   angular
      .module('angularcrud')
      .controller('ListController', ['httpFactory', 'UtilityService', ListController]);
})();
