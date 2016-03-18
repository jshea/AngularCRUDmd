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
//         '<table id="listTable">',
//            '<tr ng-repeat="person in $ctrl.personListData">',
//               '<td>',
//                  '<md-button href="#/view/{{person.id}}">{{person.lastName}}, {{person.firstName}}</md-button>',
//               '</td>',
//               '<td>',
//                  '{{person.mobile | phoneNumber}}',
//               '</td>',
//            '</tr>',
//         '</table>'

//         '<md-list id="contactList">',
//
//            '<md-list-item class="md-1-line" ng-repeat="person in $ctrl.personListData">',
//               '<div class="md-list-item-text">',
//                  '<md-button href="#/view/{{person.id}}">',
//                     '{{person.lastName}}, {{person.firstName}} {{person.mobile | phoneNumber}}',
//                  '</md-button>',
//                  '<md-divider></md-divider>',
//               '</div>',
//            '</md-list-item>',
//
//         '</md-list>'

         '<md-content class="md-padding" layout-xs="column" layout="row" layout-wrap>',
            '<div flex="33" ng-repeat="person in $ctrl.personListData" >',

               '<md-card>',
                  '<md-card-content>',
                     '{{person.lastName}}, {{person.firstName}}<br>{{person.mobile | phoneNumber}}',
                  '</md-card-content>',
                  '<div class="md-actions" layout="row" layout-align="start center" style="padding-left:8px;">',
                     '<md-button href="#/view/{{person.id}}"><md-icon>info</md-icon></md-button>',
//                     '<md-button href="#/view/{{person.id}}"><md-icon>info</md-icon></md-button>',
//                     '<md-button href="#/view/{{person.id}}"><md-icon>info</md-icon></md-button>',
                  '</div>',
               '</md-card>',

            '</div>',
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
