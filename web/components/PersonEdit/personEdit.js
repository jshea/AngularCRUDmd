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
         var self = this;

         /*
          * Trying to get a local copy of person for use in our form. At
          * this point both $scope.$ctrl.person and this.$ctrl.person are
          * undefined. Thus this is a placeholder and not yet used. Our
          * HTML template uses the bound person object.
          */
         self.$onInit = function() {
           self.localPerson = $scope.$ctrl.person;
         };

         self.onAdd = function () {
            $scope.$emit('personAdded', self.person);
         };

         self.onSave = function () {
            $scope.$emit('personSaved', self.person);
         };

         self.onDelete = function () {
            $scope.$emit('personDeleted', self.person);
         };

      }
   };

   angular
     .module('angularcrud')
     .component('personEditComponent', PersonEditComponent);
})();
