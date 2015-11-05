/*
 * Controller for the settings page.
 */

(function() {

   "use strict";

   function SettingsController($scope, $location) { // WS_URL, Here as an example
      var WS_URL; // Have to have this as we're not using dependency injection

      $scope.settings = {};

      // Set default value to be used for form input field
      if (WS_URL === null) {
         $scope.settings.url = "https://YOUR-URL-HERE/";
      }
      else {
         $scope.settings.url = WS_URL;
      }

      // Save button handler - save new settings and go to list screen
      $scope.save = function () {
         // Really should test that the url is accessible and is a valid data url

         // Make sure URL ends with "/"
         if ($scope.settings.url.slice(-1) !== "/") {
            $scope.settings.url += "/";
         }

         localStorage.setItem("WS_URL", $scope.settings.url);  // Persist the URL to localStorage for future use
         WS_URL = $scope.settings.url;                         // Set the app runtime URL variable

         $location.path("/");    // Go to list screen which will load data from the server
      };

      // Cancel new settings and return to the data list
      $scope.cancel = function () {
         $location.path("/");    // Go to list screen which will load data from the server
      };
   };

   // Register our controller
   angular.module("angularcrud")
   .controller("SettingsController", ["$scope", "$location", SettingsController]); // "WS_URL",
})();
