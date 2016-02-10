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
            ctrl.$emit('personAdded', this.person);
         };

         this.onSave = function () {
            ctrl.$emit('personSaved', this.person);
         };

         this.onDelete = function () {
            ctrl.$emit('personDeleted', this.person);
         };

      }
   };

   angular
     .module('angularcrud', [])
     .component('personEditComponent', PersonEditComponent);
})();
