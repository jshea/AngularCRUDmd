
/*
 * Controller for the edit page.
 *
 *    One must inject $scope to use $emit/$on
 *    http://stackoverflow.com/questions/28497208/angular-js-controller-as-scope-on
 */
(function() {

   'use strict';

   function EditController($scope, $routeParams, $location, httpFactory, toaster) {

      // Save a pointer to our current context
      var self = this;

      // Initialize our data to the document with key of $routeParams.id
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

      // Listen for events emitted from our Person Edit component

      // Save button was clicked - Save person and view their new detail
      $scope.$on('personSaved',
         function (event, person) {
            httpFactory.update(person,
               // WS Success
               function(data) {
                  toaster.pop('success', 'Changes saved', 'Your changes have been saved', 2000);
                  $location.path('/view/' + data.id);
               },
               // WS Failure
               function (response) {
                  toaster.pop('error', 'Web Service call failed', 'save ' + response.config.url + ' failed.');
               }
            );
         }
      );

      // Delete button clicked - Delete person and return to main scren
      $scope.$on('personDeleted',
         function (event, person) {
            httpFactory.delete(self.person.id,
            // WS Success
               function(response) {
                  toaster.pop('success', 'Changes saved', 'Person deleted', 2000);
                  $location.path('/');
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
      .controller('EditController', ['$scope', '$routeParams', '$location', 'httpFactory', 'toaster', EditController]);
})();
