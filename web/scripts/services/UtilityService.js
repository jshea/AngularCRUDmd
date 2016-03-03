(function() {
   'use strict';

   function UtilityService() {
      var self = this;

      // An array of state objects, abbreviation and name.
      self.states = [];

     /**
      * Initialize/set the states value.
      *
      * @param {type} states
      * @returns {undefined}
      */
      this.setStates = function(states) {
         self.states = states;
      };

   }

   angular
      .module('angularcrud')
      .service('UtilityService', [UtilityService]);
})();