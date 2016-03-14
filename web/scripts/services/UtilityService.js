(function() {
   'use strict';

   function UtilityService($mdToast) {
      var self = this;

      // An array of state objects, abbreviation and name.
      self.states = [];

     /**
      * Initialize/set the states value.
      *
      * @param {type} states
      * @returns {undefined}
      */
      self.setStates = function setStates(states) {
         self.states = states;
      };

      self.showToastSuccess = function showToastSuccess(message) {
         $mdToast.show(
            $mdToast.simple()
               .textContent(message)         // Message to display
               .highlightClass('md-accent')  // md-primary, md-warn and md-accent (default)
               .capsule(true)                // Rounded corners
               .position('top right')
               .hideDelay(3000)
            );
      };

      self.showToastError = function showToastError(message) {
         $mdToast.show(
            $mdToast.simple()
               .textContent(message)         // Message to display
               .highlightClass('md-accent')    // md-primary, md-warn and md-accent (default)
               .capsule(true)                // Rounded corners
               .position('top right')
               .hideDelay(3000)
            );

//         $mdToast.showSimple(message);
      };
   }

   angular
      .module('angularcrud')
      .service('UtilityService', ['$mdToast', UtilityService]);
})();