/*
 * This file defines the application module and the external libraries/modules being used.
 */
(function() {

   'use strict';

   /**
    * Create the AngularJS namespace
    */
   angular.module('angularcrud', [      // Define our Angular module
                  'ngAnimate',          // Oh, shiny animations - Note bower 'latest' doesn't bring down latest version of ngAnimate
                  'ngMaterial',         // Material Design
                  'ngMessages',         // Form validation message helper
                  'ngRoute'             // Angular base router
               ]);
})();
