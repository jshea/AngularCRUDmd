/*
 * Services to interact with our data storage via REST Web Services
 *
 *    Firebase version
 */
(function() {

   'use strict';

   function ApiService($http, $q) {
      var self = this;

      // This is the path to add to our source URL to get to the REST url's
      var WS_URL = 'https://angularcrudmaterial.firebaseio.com/data/';


      /**
       * Get all data in our data store.
       *
       * @returns {unresolved}
       */
      self.getAll = function getAll() {
         return $http.get(WS_URL + '.json')
         .then(
            function(response) {
               // Convert the Firebase object into an array
               var person = {};
               var personList = [];

               for(person in response.data) {
                  personList.push(response.data[person]);
               }

               return personList;
            }
         );
      };


      /**
       * Get one object by its id.
       *
       * @param {type} id
       * @returns {unresolved}
       */
      self.getById = function getById(id) {
         return $http.get(WS_URL + id + '/.json')
         .then(
            function (response) {
               return response.data;
            }
         );
      };


      /**
       * Note firebase returns the created id as "name". We'll stick this back into
       * our person object as an Id.
       *
       * @param {type} person
       * @returns {unresolved}
       */
      self.add = function add(person) {
         return $http.post(WS_URL + '.json', person)
         .then(
            function(response) {
               // Take the Firebase created id (name) and add it to our object with an update
               var id = response.data.name;
               person.id = id;
               return self.update(person);
            }
         );
      };


      /**
       * Save updated person object.
       *
       * @param {type} person
       * @returns {unresolved}
       */
      self.update = function update(person) {
         return $http.put(WS_URL + person.id + '/.json', person)
         .then(
            function (response) {
               return response.data;
            }
         );
      };


      /**
       * Note delete is a JS reserved word, so we use deleteObj
       *
       * @param {type} id
       * @returns {unresolved} Nothing
       */
      self.deleteObj = function deleteObj(id) {
         return $http.delete(WS_URL + id + '/.json');
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

         // Delete the old data
         return $http.delete(WS_URL + '.json')
         //  Get the sample data
         .then(
            function(response) {
               return $http.get(sampleDataUrl);
            }
         )
         // Load the sample/seed data
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

   // Register our service
   angular
      .module('angularcrud')
      .service('ApiService', ['$http', '$q', ApiService]);
})();
