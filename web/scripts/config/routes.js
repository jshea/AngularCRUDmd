(function() {

   'use strict';

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
      $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

      $routeProvider
         .when('/list', {
            controller: 'ListController',
            controllerAs: 'vm',
            templateUrl: './views/list.html'
         })

         .when('/edit/:id', {
            controller: 'EditController',
            controllerAs: 'vm',
            templateUrl: './views/edit.html'
         })

         .when('/view/:id', {
            controller: 'ViewController',
            controllerAs: 'vm',
            templateUrl: './views/view.html'
         })

         .when('/new', {
            controller: 'NewController',
            controllerAs: 'vm',
            templateUrl: './views/edit.html'
         })

         .when('/load', {
            controller: 'LoadController',
            controllerAs: 'vm',
            templateUrl: './views/load.html'
         })

         .when('/settings', {
            controller: 'SettingsController',
            controllerAs: 'vm',
            templateUrl: './views/settings.html'
         })

         .when('/instructions', {
            templateUrl: './views/instructions.html'
         })

         .when('/faq', {
            templateUrl: './views/faq.html'
         })

         .otherwise({
            redirectTo: '/list'
         });
   }

   // Register our routes with our application module
   angular
      .module('angularcrud')
      .config(['$routeProvider', '$httpProvider', Router]);
})();
