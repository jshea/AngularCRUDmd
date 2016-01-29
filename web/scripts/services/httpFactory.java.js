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
      /*
       The response object has these properties:
         data – {string|Object} – The response body transformed with the transform functions.
         status – {number} – HTTP status code of the response.
         headers – {function([headerName])} – Header getter function.
         config – {Object} – The configuration object that was used to generate the request.
         statusText – {string} – HTTP status text of the response.

         A response status code between 200 and 299 is considered a success status and will
         result in the success callback being called. Note that if the response is a redirect,
         XMLHttpRequest will transparently follow it, meaning that the error callback will not
         be called for such responses.
       */
         getAll: function (successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.get(WS_URL)
                  .then(
                     // Success
                     function (response) {
                        successCallback(response.data);
                     },
                     // Failure
                     function (response) {
                        console.log("httpFactory.writeLog() Error: ", response);
                        failureCallback(response.config.url);
                     }
                  );
         },

         getById: function (id, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.get(WS_URL + id)
                  .then(
                     // Success
                     function (response) {
                        successCallback(response.data);
                     },
                     // Failure
                     function (response) {
                        console.log("httpFactory.writeLog() Error: ", response);
                        failureCallback(response.config.url);
                     }
                  );
         },

         delete: function (id, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.delete(WS_URL + id)
                  .then(
                     // Success
                     function (response) {
                        successCallback;
                     },
                     // Failure
                     function (response) {
                        console.log("httpFactory.writeLog() Error: ", response);
                        failureCallback(response.config.url);
                     }
                  );
         },

         update: function (person, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.put(WS_URL, person)
                  .then(
                     // Success
                     function (response) {
                        successCallback(response.data);
                     },
                     // Failure
                     function (response) {
                        console.log("httpFactory.writeLog() Error: ", response);
                        failureCallback(response.config.url);
                     }
                  );
         },

         add: function (person, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.post(WS_URL, person)
                  .then(
                     // Success
                     function (response) {
                        successCallback(response.data);
                     },
                     // Failure
                     function (response) {
                        console.log("httpFactory.writeLog() Error: ", response);
                        failureCallback(response.config.url);
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
                        console.log("updateAll - 1 - Got json data", response);
                        sampleData = response.data;
                     },
                     // Failure
                     function (response) {
                        console.log("httpFactory.getAll() Error: ", response);
                     }
                  )
                  // Now we have the sample data, delete the old data and load the sample data
                  .then(
                     $http.delete(WS_URL + "deleteall")
                        .then(
                           // Success
                           function (response) {
                              for (var i = 0; i < sampleData.length; i++) {      // Iterate through local data saving to server
                                 $http.post(WS_URL, sampleData[i])
                                    .then(
                                       // Success
                                       function(response) {
                                          console.log("bulk load success", response);
                                       },
                                       // Failure
                                       function (response) {
                                          console.log("Bulk load Error: ", response);
                                       }
                                 );
                              }
                              successCallback(response);
                           },
                           // Failure
                           function (response) {
                              console.log("httpFactory.writeLog() Error: ", response);
                              failureCallback(response.config.url);
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
