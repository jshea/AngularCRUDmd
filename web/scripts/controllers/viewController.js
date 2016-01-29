/*
 * Controller for the view details page.
 */

(function() {

   'use strict';

   function ViewController($routeParams, $rootScope, $location, httpFactory, toaster) {

      // Save a pointer to our current context
      var self = this;

      // Initialize our data based on id parameter
      httpFactory.getById($routeParams.id,
         // WS Success
         function (data) {
            self.person = data;
         },
         // WS Failure
         function (url) {
            toaster.pop('error', 'Web Service call failed', 'save ' + url + ' failed.');
         }
      );

      // Handler for remove button
      self.remove = function () {
         httpFactory.delete(self.person.id,
            // WS Success
            function() {
               toaster.pop('success', 'Changes saved', 'Item deleted', 2000);
               $location.path('/');
               $rootScope.$apply();
            },
            // WS Failure
            function (url) {
               toaster.pop('error', 'Web Service call failed', 'save ' + url + ' failed.');
            }
         );
      };

      // Handler for edit button
      self.edit = function () {
         $location.path('/edit/' + self.person.id);
         $rootScope.$apply();
      };
   };

   // Register our controller
   angular.module('angularcrud')
   .controller('ViewController', ['$routeParams', '$rootScope', '$location', 'httpFactory', 'toaster', ViewController]);
})();
