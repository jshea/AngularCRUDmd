(function() {
   'use strict';

   function UtilityService($mdToast) {
      var self = this;


      /*   Toasts   */

      self.showToastSuccess = function showToastSuccess(message) {
         $mdToast.show(
            $mdToast.simple()
               .textContent(message)         // Message to display
//               .highlightClass('md-accent')  // md-primary, md-warn and md-accent (default) new in 1.1
               .capsule(true)                // Rounded corners
               .position('top right')
               .hideDelay(3000)
            );
      };

      self.showToastError = function showToastError(message) {
         $mdToast.show(
            $mdToast.simple()
               .textContent(message)         // Message to display
//               .highlightClass('md-accent')    // md-primary, md-warn and md-accent (default)
               .capsule(true)                // Rounded corners
               .position('top right')
               .hideDelay(3000)
            );
      };


   }

   angular
      .module('angularcrud')
      .service('UtilityService', ['$mdToast', UtilityService]);
})();