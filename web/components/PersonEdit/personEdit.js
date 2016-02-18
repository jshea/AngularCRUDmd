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
        person: '<' 
      },
      templateUrl: './components/PersonEdit/personEdit.html',
      controller: function ($scope, $element, $attrs) {
         var self = this;

         $scope.$watch('$ctrl.person', function() {
            if (self.person) {
               self.localPerson = self.person;
            }
         });

         self.onAdd = function () {
            $scope.$emit('personAdded', self.localPerson);
         };

         self.onSave = function () {
            $scope.$emit('personSaved', self.localPerson);
         };

         self.onDelete = function () {
            $scope.$emit('personDeleted', self.localPerson);
         };

      }
   };

   angular
     .module('angularcrud')
     .component('personEditComponent', PersonEditComponent);
})();
