/*
 * View component for displaying the detail for a Person
 * https://toddmotto.com/stateless-angular-components
 *
 *    usage: <person-view-component person="myPersonData"></person-view-component>
 */
(function() {

   'use strict';

   // Note: No controller so we have to use $ctrl
   var PersonListComponent = {
     bindings: {
       service: '<'
     },
     template: [
      '<div>',
         '<table id="listTable"',
             'ng-table="$ctrl.service.table"',
             'class="table table-condensed table-bordered table-hover table-striped"',
             'show-filter="false">',

            '<tr ng-repeat="person in $data">',
               '<td id="cellName" title="\'Name\'">',
                  '<a id="cellNameLink" href="#/view/{{person.id}}">{{person.lastName}}, {{person.firstName}}</a>',
               '</td>',
               '<td id="cellPhone" title="\'Phone\'">',
                  '{{person.mobile | phoneNumber}}',
               '</td>',
            '</tr>',

         '</table>',
      '</div>'
     ].join('')
  };

   angular
     .module('angularcrud')
     .component('personListComponent', PersonListComponent);
})();
