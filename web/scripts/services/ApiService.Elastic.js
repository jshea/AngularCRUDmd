/*
 * Services to interact with our data storage via REST Web Services
 *
 *    Elastic version - NOT TESTED - WORK IN PROGRESS!
 */

(function() {

   'use strict';

   function ApiService($http, $q) {
      var self = this;

      // This is the path to the Elasticsearch REST url
      var WS_URL = "http://localhost:9200/angularcrud/person/";


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
      self.getAll = function getAll() {
         return $http.get(WS_URL + "_search")
         .then(
            function (response) {
               var temp;
               temp = response.data._source;
               temp.id = response.data._id;
               return temp;
            }
         );
      };

      self.getById = function getById(id) {
         return $http.get(WS_URL + id)
         .then(
            function (response) {
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
               return resultArray;
            }
         );
      };

      self.add = function add(person) {
         // TODO check that id doesn't already exist!
         var id = (person.lastName + person.firstName).toLowerCase();

         return $http.put(WS_URL + id + "?refresh=true", person)
         .then(
            function (response) {
               return response.data;
            }
         );
      };

      self.update = function update(person) {
         var id = data.id; // Reuse id (lname + fname) not name as name could have changed!
         delete data.id;   // We don't want an embedded id, the _id is one level above _source in ES!

         return $http.put(WS_URL + id + "?refresh=true", person)   // we use the id not the name as the name could have changed.
         .then(
            function (response) {
               return response.data;
            }
         );
      };

      // Note delete is a JS reserved word, so we use deleteObj
      self.deleteObj = function deleteObj(id) {
         return $http.delete(WS_URL + id + "?refresh=true");
      };

         /*
          * Get a list of states to build a picklist and could be used for validation.
          */
      self.getStates = function getStates(successCallback, failureCallback) {
         var dataUrl = 'sampledata/states.json';   // URL for our state data

         return $http.get(dataUrl)
         .then(
            function (response) {
               return response.data;
            }
         );
      };

      /*
       * Note - This uses $q.all to wait until all promises (run in parallel) complete. This could
       *        overwhelm your REST service. Another strategy is to use $q.when to wait until all
       *        promises run sequentially, complete.
       *
       *        https://daveceddia.com/waiting-for-promises-in-a-loop/
       *
       *        var chain = $q.when();
       *        for(var i = 0; i < result.data.length; i++) {
       *           chain = chain.then(function() {
       *              return $http.post(WS_URL, result.data[i]);
       *           });
       *        }
       */
      self.loadSeedData = function loadSeedData() {
         var sampleDataUrl = 'sampledata/sample.json';   // URL for our sample data
         var self = this;

         // Delete the old data and load the sample data
         // NOTE - ES will throw an error if the index didn't exist?
         //        May need a catch?
         return $http.delete(WS_URL)
         .then(function() {
            // Get the sample data
            return $http.get(sampleDataUrl);
         })
         .then(
            function (result) {
               self.promises = [];

               // Iterate through local data saving to server
               for (var i = 0; i < result.data.length; i++) {
                  // Push each promise to an array and then return $q.all([promiseArray])
                  self.promises.push(self.add(result.data[i]));
               }

               return $q.all(self.promises);
            }
         );
      };

   }

   // Register the service
   angular
      .module('angularcrud')
      .service('ApiService', ['$http', '$q', ApiService]);
})();