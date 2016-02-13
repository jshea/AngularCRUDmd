/*
 * Controller for the new person page.
 */

(function() {

   'use strict';

   function NewController($scope, $location, httpFactory, toaster) {

      // Save a pointer to our current context
      var self = this;
      self.person = {};

      // Add button was clicked - Save person and view their new detail
      $scope.$on('personAdded',
         function (event, person) {
            httpFactory.add(person,
               // WS Success
               function(data) {
                  toaster.pop('success', 'Person added', 'Your changes have been saved', 2000);
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
      .controller('NewController', ['$scope', '$location', 'httpFactory', 'toaster', NewController]);
})();
