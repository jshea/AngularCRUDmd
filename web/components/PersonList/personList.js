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
         '<md-content class="md-padding" layout-xs="column" layout="row" layout-wrap>',
// Does virtual repeat work with cards?
//         '<md-virtual-repeat-container id="vertical-container">',
//            '<div md-virtual-repeat="person in $ctrl.personListData" class="repeated-item" flex="33">',

         '<div ng-repeat="person in $ctrl.personListData | orderBy:\'lastName\'">',

               '<md-card>',
                  '<md-card-content layout="row" layout-align="center">',
                     '{{person.lastName}}, {{person.firstName}}<br>{{person.mobile | phoneNumber}}',
                     '<md-card-actions layout="column">',
                        '<md-button class="md-icon-button" href="#/view/{{person.id}}"><md-icon>zoom_in</md-icon></md-button>',
                        '<md-button class="md-icon-button" href="#/edit/{{person.id}}"><md-icon>mode_edit</md-icon></md-button>',
                     '</md-card-actions>',
                  '</md-card-content>',
               '</md-card>',
            '</div>',

//            '</div>',
//          '</md-virtual-repeat-container>',
         '</md-content>'
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
