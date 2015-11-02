/* global angular */

(function() {

   "use strict";

   // Set up our application routes. These are paths through the application based on the URL.
   function Router($routeProvider, $httpProvider) {

      /* Initialize GET if not there.
       *
       * Get isn't listed as one of the defaults.
       * https://docs.angularjs.org/api/ng/service/$http
       */
      if (!$httpProvider.defaults.headers.get) {
         $httpProvider.defaults.headers.get = {};
      }

      // Turn off IE caching - https://github.com/angular/angular.js/issues/8565
      $httpProvider.defaults.headers.get["If-Modified-Since"] = "0";

      $routeProvider
         .when("/", {
            controller: "ListController",
            templateUrl: "./views/list.html"
         })

         .when("/edit/:id", {
            controller: "EditController",
            templateUrl: "./views/edit.html"
         })

         .when("/view/:id", {
            controller: "ViewController",
            templateUrl: "./views/view.html"
         })

         .when("/new", {
            controller: "NewController",
            templateUrl: "./views/edit.html"
         })

         .when("/load", {
            controller: "LoadController",
            templateUrl: "./views/load.html"
         })

         .when("/settings", {
            controller: "SettingsController",
            templateUrl: "./views/settings.html"
         })

         .otherwise({
            redirectTo: "/"
         });
   }

   // Register our routes
   angular.module("angularcrud").config(["$routeProvider", "$httpProvider", Router]);
})();
