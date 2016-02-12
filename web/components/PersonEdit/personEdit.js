/*
 * Edit component for editing the detail for a Person (or adding a new person)
 *
 *    usage: <person-edit-component person="myPersonData"></person-edit-component>
 *
 *    One must inject $scope to use $emit/$on
 *    http://stackoverflow.com/questions/28497208/angular-js-controller-as-scope-on
 */
(function() {

   'use strict';

   var PersonEditComponent = {
      bindings: {
        person: '='  // Bidirectional binding
      },
      templateUrl: './components/PersonEdit/personEdit.html',
      controller: function ($scope, $element, $attrs) {
         var ctrl = this;
         // TODO - How to create a local copy of person to use in the form? And then
         //        pass back to the following functions.
         // var localPerson = $scope.$ctrl.person;

         ctrl.onAdd = function () {
            $scope.$emit('personAdded', ctrl.person);
         };

         ctrl.onSave = function () {
            $scope.$emit('personSaved', ctrl.person);
         };

         ctrl.onDelete = function () {
            $scope.$emit('personDeleted', ctrl.person);
         };

      }
   };

   angular
     .module('angularcrud')
     .component('personEditComponent', PersonEditComponent);
})();
