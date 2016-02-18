/*
 * Controller for the view details page.
 */
(function() {

   'use strict';

   function ViewController($routeParams, $location, httpFactory, toaster) {

      var self = this;     // Save a pointer to our current context

      // Initialize our data based on id parameter
      httpFactory.getById($routeParams.id,
         // WS Success
         function (data) {
            self.person = data;
         },
         // WS Failure
         function (response) {
            toaster.pop('error', 'Web Service call failed', 'save ' + response.config.url + ' failed.');
         }
      );

      // Handler for remove button
      self.delete = function () {
         httpFactory.delete(self.person.id,
            // WS Success
            function(response) {
               toaster.pop('success', 'Changes saved', 'Item deleted', 2000);
               $location.path('/');
            },
            // WS Failure
            function (response) {
               toaster.pop('error', 'Web Service call failed', 'save ' + response.config.url + ' failed.');
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
      .controller('ViewController', ['$routeParams', '$location', 'httpFactory', 'toaster', ViewController]);
})();
