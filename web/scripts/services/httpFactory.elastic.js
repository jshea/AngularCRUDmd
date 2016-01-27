/*
 * Services to interact with our data storage
 */

(function() {

   "use strict";

   /*
    * Note use of Elasticsearch "?refresh=true" on RESTful service calls.
    *
    * http://www.elastic.co/guide/en/elasticsearch/reference/1.x/docs-index_.html#index-refresh
    * "To refresh the shard (not the whole index) immediately after the operation occurs, so that the document appears
    *  in search results immediately, the refresh parameter can be set to true. Setting this option to true should ONLY
    *  be done after careful thought and verification that it does not lead to poor performance, both from an indexing
    *  and a search standpoint."
    */

   /**
    * Service for making web service calls.
    *
    * @param {type} $http Angular service for making web service calls
    * @param {type} $rootScope Angular root scope, used by busy indicator ($rootScope.myPromise)
    */
   function HttpFactory($http, $rootScope) {

      // This is the path to the Elasticsearch REST url
      var WS_URL = "http://localhost:9200/angularcrud/person/";

      /*
       * Factory return object. This contains all our individual data factory
       * methods that we're making available.
       */
      var httpFactory = {

         /**
          *
          * @param {type} successCallback
          * @param {type} failureCallback
          * @returns {undefined}
          */
         getAll: function (successCallback, failureCallback) {
/*
POST angularcrud/person/_search
{
  "_source" : ["lastName", "firstName"],
  "size": 500,
  "sort" : ["lastName", "firstName"],
  "query": {
    "match_all": {}
  }
}
*/
            $rootScope.myPromise =
               $http.get(WS_URL + "_search")  // , "{\"sort\" : [{\"lastName\" : {\"order\" : \"asc\"}}]}")
                  .then(
                     // success
                     function(response) {
                        var resultArray = [], oneResult = {};

                        // hits.total is how may documents match, but hits.hits.length is what was actually returned!
                        // for (var i=0; i<data.hits.total; i++) {

                        for (var i=0; i<response.data.hits.hits.length; i++) {
                           if (response.data.hits.hits[i].hasOwnProperty("_source") && response.data.hits.hits[i].hasOwnProperty("_id")) {
                              oneResult = response.data.hits.hits[i]._source;
                              oneResult.id = response.data.hits.hits[i]._id;
                              resultArray.push(oneResult);
                           }
                           else {
                              console.log("hasOwnProperty failed! " + response.data.hits.hits[i]);
                           }
                        }
                        successCallback(resultArray);
                     },
                     // Failure
                     function (response) {
                        console.log("httpFactory.getAll() Error: " + response.data);
                        failureCallback(response.config.url);
                     }
                  );
         },

         /**
          *
          * @param {type} id
          * @param {type} successCallback
          * @param {type} failureCallback
          * @returns {undefined}
          */
         getById: function (id, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.get(WS_URL + id)
                  .then(
                     function(response) {
                        var temp;
                        temp = response.data._source;
                        temp.id = response.data._id;
                        successCallback(temp);
                     },
                     function (response) {
                        console.log("httpFactory.getById() Error: " + response.data);
                        failureCallback(response.config.url);
                     }
                  );
         },

         /**
          *
          * @param {type} id
          * @param {type} successCallback
          * @param {type} failureCallback
          * @returns {undefined}
          */
         delete: function (id, successCallback, failureCallback) {
            $rootScope.myPromise =
               $http.delete(WS_URL + id + "?refresh=true")
                  .then(
                     successCallback
                     ,
                     function (response) {
                        console.log("httpFactory.delete() Error: " + response.data);
                        failureCallback(response.config.url);
                     }
                  );
         },

         /**
          *
          * @param {type} data
          * @param {type} successCallback
          * @param {type} failureCallback
          * @returns {undefined}
          */
         update: function (data, successCallback, failureCallback) {
            var id = data.id; // Reuse id (lname + fname) not name as name could have changed!
            delete data.id;   // We don't want an embedded id, the _id is one level above _source in ES!

            $rootScope.myPromise =
               $http.put(WS_URL + id + "?refresh=true", data)   // we use the id not the name as the name could have changed.
                  .then(
                     function (response) {
                        successCallback(id);
                     },
                     function (response) {
                        console.log("httpFactory.update() Error: " + response.data);
                        failureCallback(response.config.url);
                     }
                  );
         },

         /**
          *
          * @param {type} data
          * @param {type} successCallback
          * @param {type} failureCallback
          * @returns {undefined}
          */
         add: function (data, successCallback, failureCallback) {
            // TODO check that id doesn't already exist!
            var id = (data.lastName + data.firstName).toLowerCase();

            $rootScope.myPromise =
               $http.put(WS_URL + id + "?refresh=true", data)
                  .then(
                     function (response) {
                        successCallback(id);
                     },
                     function (response) {
                        console.log("httpFactory.add() Error: " + response.data);
                        failureCallback(response.config.url);
                     }
                  );
         },

         /**
          *
          * @param {type} successCallback
          * @returns {undefined}
          */
         updateAll: function (successCallback) {
            var sampleDataUrl = "sampledata/sample.json";   // URL for our sample data
            var sampleData = "";

            // Read our sample data from the file system
            $rootScope.myPromise =
               $http.get(sampleDataUrl)
                  .then(
                     function(response) {
                        console.dir("updateAll - 1 - Got json data");
                        sampleData = response.data;
                     },
                     function (response) {
                        console.log("httpFactory.getAll() Error: " + response.data);
                     }
               )
               // Now we have the sample data, delete the old data and load the sample data
               .then(
                  $http.delete(WS_URL)
                     // Old data existed
                     .then(
                        function () {
                           console.dir("updateAll - 2 - Loading data to ES");
                           for (var i = 0; i < sampleData.length; i++) {      // Iterate through local data saving to server
                              $http.put(WS_URL + (sampleData[i].lastName + sampleData[i].firstName).toLowerCase() + "?refresh=true", sampleData[i]);
                           }
                           successCallback();
                        },
                        // Old data didn't exist (or some other error!)
                        function (response) {
                           console.log("httpFactory.updateAll() Error: " + response.data);
                           for (var i = 0; i < sampleData.length; i++) {      // Iterate through local data saving to server
                              $http.put(WS_URL + (sampleData[i].lastName + sampleData[i].firstName).toLowerCase() + "?refresh=true", sampleData[i]);
                           }
                           // No failure callback here. We don't need it as we eat errors in case the data never existed.
                           successCallback();
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
