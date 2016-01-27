/*
 * Java/Jersey version of the middle tier REST web services.
 *
 * Services to interact with our data storage via REST Web Services
 */

/* global angular */
(function() {

   "use strict";

   /*
    * Our controllers interact with dataFactory which is a facade for server or local storage. If we have
    * a network connection, we use our rest service. Otherwise we use our local storage service.
    */
   function HttpFactory($http, $rootScope) {

      // This is the path to the Elasticsearch REST url
      var WS_URL = "ws/review/";

      /*
       * Factory return object. This contains all our individual data factory
       * methods that we're making available.
       */
      var httpFactory = {

         getAll: function (successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.get(WS_URL)
                  .success(function (data, status, headers, config) {
                     successCallback;
                  })
                  .error(function (data, status, headers, config) {
                     console.log("httpFactory.writeLog() Error: " + data);
                     failureCallback(config.url);
                  });
         },

         getById: function (id, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.get(WS_URL + id)
                  .success(function (data, status, headers, config) {
                     successCallback;
                  })
                  .error(function (data, status, headers, config) {
                     console.log("httpFactory.writeLog() Error: " + data);
                     failureCallback(config.url);
                  });
         },

         delete: function (id, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.delete(WS_URL + id)
                  .success(function (data, status, headers, config) {
                     successCallback;
                  })
                  .error(function (data, status, headers, config) {
                     console.log("httpFactory.writeLog() Error: " + data);
                     failureCallback(config.url);
                  });
         },

         update: function (id, first, last, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http({
                     url: WS_URL,
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
            $rootScope.myPromise =
               $http.post(WS_URL, {firstName:first, lastName:last})
                  .success(function (data, status, headers, config) {
                     successCallback;
                  })
                  .error(function (data, status, headers, config) {
                     console.log("httpFactory.writeLog() Error: " + data);
                     failureCallback(config.url);
                  });
         },

         updateAll: function (data, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.delete(WS_URL + "deleteall")
                  .success(function () {
                     for (var i = 0; i < data.length; i++) {      // Iterate through local data saving to server
                        $http.post(WS_URL, {firstName:data[i].firstName, lastName:data[i].lastName});
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
   angular.module("angularcrud")
          .factory("httpFactory", ["$http", "$rootScope", HttpFactory]);
})();
