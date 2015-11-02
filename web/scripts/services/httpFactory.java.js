/*
 * Java/Jersey version of the middle tier REST web services.
 *
 * Services to interact with our data storage - Server using REST Web Services
 * and local data storage via localForage
 */

/* global angular, localforage */
(function() {
   "use strict";

angular.module("angularcrud")
   /*
    * Our controllers interact with dataFactory which is a facade for server or local storage. If we have
    * a network connection, we use our rest service. Otherwise we use our local storage service.
    */
   function HttpFactory($http, $rootScope) {
      var httpFactory = {

         getAll: function (successCallback, failureCallback) {
            $rootScope.myPromise = $http.get($rootScope.RESTURL)
            .success(function (data, status, headers, config) {
               successCallback;
            })
            .error(function (data, status, headers, config) {
               console.log("httpFactory.writeLog() Error: " + data);
               failureCallback(config.url);
            });
         },

         getById: function (id, successCallback, failureCallback) {
            $rootScope.myPromise = $http.get($rootScope.RESTURL + id)
            .success(function (data, status, headers, config) {
               successCallback;
            })
            .error(function (data, status, headers, config) {
               console.log("httpFactory.writeLog() Error: " + data);
               failureCallback(config.url);
            });
         },

         delete: function (id, successCallback, failureCallback) {
            $rootScope.myPromise = $http.delete($rootScope.RESTURL + id)
            .success(function (data, status, headers, config) {
               successCallback;
            })
            .error(function (data, status, headers, config) {
               console.log("httpFactory.writeLog() Error: " + data);
               failureCallback(config.url);
            });
         },

         update: function (id, first, last, successCallback, failureCallback) {
            $rootScope.myPromise = $http({
               url: $rootScope.RESTURL,
               data: {"id": id, "firstName":first, "lastName":last},
               method: "PUT"
            })
            .success(function (data, status, headers, config) {
               successCallback;
            })
            .error(function (data, status, headers, config) {
               console.log("httpFactory.writeLog() Error: " + data);
               failureCallback(config.url);
            });
         },

         add: function (first, last, successCallback, failureCallback) {
            $rootScope.myPromise = $http.post($rootScope.RESTURL, {firstName:first, lastName:last})
            .success(function (data, status, headers, config) {
               successCallback;
            })
            .error(function (data, status, headers, config) {
               console.log("httpFactory.writeLog() Error: " + data);
               failureCallback(config.url);
            });
         },

         updateAll: function (data, successCallback, failureCallback) {
            $rootScope.myPromise = $http.delete($rootScope.RESTURL + "deleteall")
               .success(function () {
                  for (var i = 0; i < data.length; i++) {      // Iterate through local data saving to server
                     $http.post($rootScope.RESTURL, {firstName:data[i].firstName, lastName:data[i].lastName});
                  }
                  successCallback;
               })
            .error(function (data, status, headers, config) {
               console.log("httpFactory.writeLog() Error: " + data);
               failureCallback(config.url);
            });
         }
      };
      return httpFactory;
   };

   // Register our factory
   angular.module("angularCRUD").factory("httpFactory", ["$http", "$rootScope", "URL", HttpFactory]);
})();
