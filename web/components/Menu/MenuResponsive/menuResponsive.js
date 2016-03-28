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
         '<div layout="column" layout-fill>',
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
                  '<md-button href="#/list">Contact List</md-button>',
                  '<br><md-button href="#/new">New Contact</md-button>',
                  '<br><md-button href="#/load">Initialize Data</md-button>',
                  '<br><md-button href="#/instructions">Instructions</md-button>',
                  '<br><md-button href="#/faq">FAQs</md-button>',

                  '<md-button ng-click="$ctrl.close()" class="md-primary">',
                    'Close',
                  '</md-button>',
               '</md-content>',

            '</md-sidenav>',
         '</div>',
         '</div>'
      ].join(''),

      controller: function ($mdSidenav) {
         var self = this;

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
