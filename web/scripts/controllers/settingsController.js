/*
 * Controller for the settings page.
 */

(function() {

   'use strict';

   function SettingsController($location) { // WS_URL, Here as an example

      // Save a pointer to our current context
      var self = this;
      var WS_URL; // Have to have this as we're not using dependency injection

      self.settings = {};

      // Set default value to be used for form input field
      if (WS_URL === null) {
         self.settings.url = 'https://YOUR-URL-HERE/';
      }
      else {
         self.settings.url = WS_URL;
      }

      // Save button handler - save new settings and go to list screen
      self.save = function () {
         // Really should test that the url is accessible and is a valid data url

         // Make sure URL ends with '/'
         if (self.settings.url.slice(-1) !== '/') {
            self.settings.url += '/';
         }

         localStorage.setItem('WS_URL', self.settings.url);  // Persist the URL to localStorage for future use
         WS_URL = self.settings.url;                         // Set the app runtime URL variable

         $location.path('/');    // Go to list screen which will load data from the server
      };

      // Cancel new settings and return to the data list
      self.cancel = function () {
         $location.path('/');    // Go to list screen which will load data from the server
      };
   };

   // Register our controller
   angular.module('angularcrud')
   .controller('SettingsController', ['$location', SettingsController]); // 'WS_URL',
})();
