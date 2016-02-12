/*
 * Controller for the new person page.
 */

(function() {

   'use strict';

   function NewController($location, httpFactory, toaster) {

      // Save a pointer to our current context
      var self = this;
      self.person = {};

      // Add button was clicked - Save person and view their new detail
      self.$on('personAdded',
         function (event, person) {
            httpFactory.update(person,
               // WS Success
               function(data) {
                  toaster.pop('success', 'Changes saved', 'Your data has been saved', 2000);
                  $location.path('/view/' + data.id);
               },
               // WS Failure
               function (response) {
                  toaster.pop('error', 'Web Service call failed', 'save ' + response.config.url + ' failed.');
               }
            );
         }
      );
   };

   // Register our controller
   angular.module('angularcrud')
   .controller('NewController', ['$location', 'httpFactory', 'toaster', NewController]);
})();
