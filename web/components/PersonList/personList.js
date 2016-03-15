/*
 * View component for displaying the detail for a Person
 * https://toddmotto.com/stateless-angular-components
 *
 *    usage: <person-view-component person="myPersonData"></person-view-component>
 */
(function() {

   'use strict';

   var PersonListComponent = {
     bindings: {
       personListData: '<'
     },
     template: [
         '<table id="listTable">',

            '<tr ng-repeat="person in $ctrl.personListData">',
               '<td>',
                  '<md-button href="#/view/{{person.id}}">{{person.lastName}}, {{person.firstName}}</md-button>',
               '</td>',
               '<td>',
                  '{{person.mobile | phoneNumber}}',
               '</td>',
            '</tr>',

         '</table>'
      ].join(''),
      controller: function ($scope) {
         var self = this;

         // Initialize the table when data is loaded
//         $scope.$watch('$ctrl.personListData', function() {
//            if (self.personListData) {
//               if (self.personListData.length < 25) {
//                  self.table = new NgTableParams({count: self.personListData.length}, {dataset: self.personListData, counts: []});
//               }
//               else {
//                  self.table = new NgTableParams({}, {dataset: self.personListData});
//               }
//            }
//         });
      }

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('personListComponent', PersonListComponent);
})();
