/*
 * Edit component for editing the detail for a Person (or adding a new person)
 *
 *    usage: <person-edit-component person="myPersonData"></person-edit-component>
 */
(function() {

   'use strict';

   var PersonEditComponent = {
      bindings: {
        person: '='
      },
      templateUrl: './components/PersonEdit/personEdit.html',
      controller: function ($scope, $element, $attrs) {
         var ctrl = this;

         ctrl.onAdd = function () {
            ctrl.$emit('personAdded', ctrl.person);
         };

         this.onSave = function () {
            ctrl.$emit('personSaved', ctrl.person);
         };

         this.onDelete = function () {
            ctrl.$emit('personDeleted', ctrl.person);
         };

      }
   };

   angular
     .module('angularcrud', [])
     .component('personEditComponent', PersonEditComponent);
})();
