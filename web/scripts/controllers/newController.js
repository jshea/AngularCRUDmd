/*
 * Controller for the new person page.
 */

(function() {

   'use strict';

   function NewController($location, httpFactory, toaster) {

      // Save a pointer to our current context
      var self = this;
      self.person = {};

      // Save our changes and display a view of the new data
      self.save = function () {
         httpFactory.add(self.person,
            // WS Success
            function(person) {
               toaster.pop('success', 'Changes saved', 'Your data has been saved', 2000);
               $location.path('/view/' + person.id);
            },
            // WS Failure
            function (response) {
               toaster.pop('error', 'Web Service call failed', 'save ' + response.config.url + ' failed.');
            }
         );
      };
   };

   // Register our controller
   angular.module('angularcrud')
   .controller('NewController', ['$location', 'httpFactory', 'toaster', NewController]);
})();
