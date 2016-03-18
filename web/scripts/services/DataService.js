(function() {
   'use strict';

   function DataService(ApiService, UtilityService, $rootScope) {
      var self = this;

      // An array of state objects, abbreviation and name.
      self.states = [];

     /**
      * Initialize/set the states value.
      *
      * @param {type} states
      * @returns {undefined}
      */
      self.setStates = function setStates(states) {
         self.states = states;
      };


      /*   Getting/Setting data   */

      self.personGet = function personGet(personId, successCallBack) {
         $rootScope.isLoading = true;

         ApiService.getById(personId)
         .then(
            function (response) {
               successCallBack(response.data);
            }
         )
         .catch(
            function (response) {
               console.log("ApiService.personGet() Error: ", response);
               UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
            }
         )
         .finally(
            function() {
               $rootScope.isLoading = false;
            }
         );
      };


      self.personGetAll = function personGetAll(successCallBack) {
         $rootScope.isLoading = true;

         ApiService.getAll()
         .then(
            function (response) {
               successCallBack(response.data);
            }
         )
         .catch(
            function (response) {
               console.log("ApiService.personGetAll() Error: ", response);
               UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
            }
         )
         .finally(
            function() {
               $rootScope.isLoading = false;
            }
         );
      };


      self.personAdd = function personAdd(person, successCallBack) {
         $rootScope.isLoading = true;

         ApiService.add(person)
         .then(
            function(response) {
               UtilityService.showToastSuccess('Person added - Your changes have been saved');
               successCallBack(response.data);
            }
         )
         .catch(
            function (response) {
               console.log("ApiService.personAdd() Error: ", response);
               UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
            }
         )
         .finally(
            function() {
               $rootScope.isLoading = false;
            }
         );
      };


      self.personUpdate = function personUpdate(person, successCallBack) {
         $rootScope.isLoading = true;

         return ApiService.update(person)
         .then(
            function(response) {
               UtilityService.showToastSuccess('Changes saved - Your changes have been saved');
               successCallBack(response.data);
            }
         )
         .catch(
            function (response) {
               console.log("ApiService.personUpdate() Error: ", response);
               UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
            }
         )
         .finally(
            function() {
               $rootScope.isLoading = false;
            }
         );
      };


      self.personDelete = function personDelete(personId, successCallBack) {
         $rootScope.isLoading = true;

         return ApiService.deleteObj(personId)
         .then(
            function(response) {
               UtilityService.showToastSuccess('Changes saved - Item deleted');
               successCallBack();
            }
         )
         .catch(
            function (response) {
               console.log("ApiService.personDelete() Error: ", response);
               UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
            }
         )
         .finally(
            function() {
               $rootScope.isLoading = false;
            }
         );
      };

   }

   angular
      .module('angularcrud')
      .service('DataService', ['ApiService', 'UtilityService', '$rootScope', DataService]);
})();