/*
 * Responsive
 *
 *    usage: <menu-responsive-component></menu-responsive-component>
 */
(function() {

   'use strict';

   var MenuResponsiveComponent = {
      bindings: {
         personListData: '<'
      },

      template: [
         '<div layout="column">',
            '<md-toolbar>',
               '<div class="md-toolbar-tools">',
                  '<md-button class="md-icon-button" ng-click="$ctrl.toggle()">',
                     '<md-icon>menu</md-icon>',
                  '</md-button>',
                  'AngularCRUD',
               '</div>',
            '</md-toolbar>',
         '</div>',
         '<div layout="row">',
            '<md-sidenav class="md-sidenav-left md-whiteframe-4dp" md-component-id="sidenav">',

               '<md-content>',
                  '<md-button ng-click="$ctrl.menuAction(\'/list\')">Contact List</md-button>',
                  '<br><md-button ng-click="$ctrl.menuAction(\'/new\')">New Contact</md-button>',
                  '<br><md-button ng-click="$ctrl.menuAction(\'/load\')">Initialize Data</md-button>',
                  '<br><md-button ng-click="$ctrl.menuAction(\'/instructions\')">Instructions</md-button>',
                  '<br><md-button ng-click="$ctrl.menuAction(\'/faq\')">FAQs</md-button>',

                  '<p><md-button ng-click="$ctrl.close()" class="md-primary">',
                    'Close',
                  '</md-button>',
               '</md-content>',

            '</md-sidenav>',
         '</div>',
         '</div>'
      ].join(''),

      controller: function ($mdSidenav, $location) {
         var self = this;

         self.menuAction = function (location) {
            $location.path(location);
            $mdSidenav('sidenav').close();
         };

         self.close = function () {
            $mdSidenav('sidenav').close();
         };

         self.toggle = function () {
            $mdSidenav('sidenav').toggle();
         };
      }

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('menuResponsiveComponent', MenuResponsiveComponent);
})();
