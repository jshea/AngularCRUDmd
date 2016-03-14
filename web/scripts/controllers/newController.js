/*
 * Controller for the new person page.
 */
(function() {

   'use strict';

   function NewController($scope, $location, httpFactory, UtilityService) {


      var self = this;     // Save a pointer to our current context
      self.person = {};    // Initialize the person object as an empty object

      // Add button was clicked - Save person and view their new detail
      $scope.$on('personAdded',
         function (event, person) {
            httpFactory.add(person,
               // WS Success
               function(data) {
                  UtilityService.showToastSuccess('Person added - Your changes have been saved');
                  $location.path('/view/' + data.id);
               },
               // WS Failure
               function (response) {
                  UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
               }
            );
         }
      );

   };

   // Register our controller
   angular
      .module('angularcrud')
      .controller('NewController', ['$scope', '$location', 'httpFactory', 'UtilityService', NewController]);
})();
