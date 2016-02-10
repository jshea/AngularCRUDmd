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

         It looks like the callbacks must be passed the response, even if they don't use it? They
         don't seem to be called if the response isn't passed as a param.
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
                        failureCallback(response);
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
                        failureCallback(response);
                     }
                  );
         },

         delete: function (id, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.delete(WS_URL + id)
                  .then(
                     // Success
                     function (response) {
                        successCallback(response);
                     },
                     // Failure
                     function (response) {
                        console.log("httpFactory.writeLog() Error: ", response);
                        failureCallback(response);
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
                        failureCallback(response);
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
                        failureCallback(response);
                     }
                  );
         },

         updateAll: function (successCallback, failureCallback) {
            var sampleDataUrl = "sampledata/sample.json";   // URL for our sample data

            $rootScope.myPromise =

            // Delete the old data and load the sample data
            $http.delete(WS_URL + "deleteall")
               .then(function() {
                  // Get the sample data
                  return $http.get(sampleDataUrl);
               })
               .then(function (result) {
                  /*
                   * TODO - Add middle tier API for PersonDAO.add(List<Person> personList) and
                   *        pass the result.data array. This will do the looping in PersonDAO.
                   */
                  for (var i = 0; i < result.data.length; i++) {      // Iterate through local data saving to server
                     /*
                      * TODO - Push each promise to an array and then return $q.all([promiseArray])?
                      */
                     $http.post(WS_URL, result.data[i])
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

                  // But the post requests aren't necessarily finished!
                  return "I'm all done?";
               })
               .finally(successCallback, failureCallback);
         }

      };

      return httpFactory;
   };

   // Register our factory
   angular.module("angularcrud")
          .factory("httpFactory", ["$http", "$rootScope", HttpFactory]);
})();
