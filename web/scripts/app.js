/*
 * This file defines the application module and the external libraries/modules being used.
 */

(function() {

   'use strict';

   /**
    * Create the AngularJS namespace
    */
   angular.module('angularcrud', [         // Define our Angular module
                  'ngRoute',               // Angular base router
                  'ngMessages',            // Form validation message helper
                  'ngAnimate',             // Oh, shiny animations - Note bower 'latest' doesn't bring down latest version of ngAnimate
                  'ui.bootstrap',          // Extra Bootstrap based widgets
                  'toaster',               // Popup messages (toasts)
                  'cgBusy',                // Busy indicator
                  'ngTable'                // Fancy table - sorting, pagination and much more
               ]);
})();
