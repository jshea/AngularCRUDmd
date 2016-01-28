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
      var WS_URL = "ws/person/";

      /*
       * Factory return object. This contains all our individual data factory
       * methods that we're making available.
       */
      var httpFactory = {

         getAll: function (successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.get(WS_URL)
                  .then(
                     // Success
                     function (data, status, headers, config) {
                        successCallback(data);
                     },
                     // Failure
                     function (data, status, headers, config) {
                        console.log("httpFactory.writeLog() Error: " + data);
                        failureCallback(config.url);
                     }
                  );
         },

         getById: function (id, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.get(WS_URL + id)
                  .then(
                     // Success
                     function (data, status, headers, config) {
                        successCallback(data);
                     },
                     // Failure
                     function (data, status, headers, config) {
                        console.log("httpFactory.writeLog() Error: " + data);
                        failureCallback(config.url);
                     }
                  );
         },

         delete: function (id, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.delete(WS_URL + id)
                  .then(
                     // Success
                     function (data, status, headers, config) {
                        successCallback;
                     },
                     // Failure
                     function (data, status, headers, config) {
                        console.log("httpFactory.writeLog() Error: " + data);
                        failureCallback(config.url);
                     }
                  );
         },

         update: function (id, first, last, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http({
                     url: WS_URL,
                     data: {"id": id, "firstName":first, "lastName":last},
                     method: "PUT"
                  })
                  .then(
                     // Success
                     function (data, status, headers, config) {
                        successCallback(data);
                     },
                     // Failure
                     function (data, status, headers, config) {
                        console.log("httpFactory.writeLog() Error: " + data);
                        failureCallback(config.url);
                     }
                  );
         },

         add: function (first, last, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.post(WS_URL, {firstName:first, lastName:last})
                  .then(
                     // Success
                     function (data, status, headers, config) {
                        successCallback(data);
                     },
                     // Failure
                     function (data, status, headers, config) {
                        console.log("httpFactory.writeLog() Error: " + data);
                        failureCallback(config.url);
                     }
                  );
         },

         updateAll: function (data, successCallback, failureCallback) {
            var sampleDataUrl = "sampledata/sample.json";   // URL for our sample data
            var sampleData = "";

            $rootScope.myPromise =
               $http.get(sampleDataUrl)
                  .then(
                     // Success
                     function(response) {
                        console.dir("updateAll - 1 - Got json data", response.data);
                        sampleData = response.data;
                     },
                     // Failure
                     function (response) {
                        console.log("httpFactory.getAll() Error: " + response.data);
                     }
                  )
                  // Now we have the sample data, delete the old data and load the sample data
                  .then(
                     $http.delete(WS_URL + "deleteall")
                        .then(
                           // Success
                           function () {
                              for (var i = 0; i < sampleData.length; i++) {      // Iterate through local data saving to server
//                               $http.post(WS_URL, {firstName:sampleData[i].firstName, sampleData:data[i].lastName});
                                 $http.post(WS_URL, sampleData[i]);
                              }
                              successCallback;
                           },
                           // Failure
                           function (data, status, headers, config) {
                              console.log("httpFactory.writeLog() Error: " + data);
                              failureCallback(config.url);
                           }
                        )
                  );
         }
      };

      return httpFactory;
   };

   // Register our factory
   angular.module("angularcrud")
          .factory("httpFactory", ["$http", "$rootScope", HttpFactory]);
})();
