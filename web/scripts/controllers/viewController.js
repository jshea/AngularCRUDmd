/*
 * Controller for the view details page.
 */
(function() {

   'use strict';

   function ViewController($routeParams, $location, httpFactory, UtilityService) {

      var self = this;     // Save a pointer to our current context

      // Initialize our data based on id parameter
      httpFactory.getById($routeParams.id,
         // WS Success
         function (data) {
            self.person = data;
         },
         // WS Failure
         function (response) {
            UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
         }
      );

      // Handler for remove button
      self.delete = function () {
         httpFactory.delete(self.person.id,
            // WS Success
            function(response) {
               UtilityService.showToastSuccess('Changes saved - Item deleted');
               $location.path('/');
            },
            // WS Failure
            function (response) {
               UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
            }
         );
      };

      // Handler for edit button
      self.edit = function () {
         $location.path('/edit/' + self.person.id);
      };
   };

   // Register our controller
   angular
      .module('angularcrud')
      .controller('ViewController', ['$routeParams', '$location', 'httpFactory', 'UtilityService', ViewController]);
})();
