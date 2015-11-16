
/* global toaster */

/*
 * Controller for the edit page.
 */
(function() {

   "use strict";

   function EditController($routeParams, $location, httpFactory, toaster) {

      // Save a pointer to our current context
      var self = this;

      // Initialize our data to the document with key of $routeParams.id
      httpFactory.getById($routeParams.id,
         function (data) {
            self.person = data;
         },
         // WS Failure
         function (url) {
            toaster.pop("error", "Web Service call failed", "save " + url + " failed.");
         }
      );

      // Delete button handler - Delete document and return to main scren
      self.remove = function () {
         httpFactory.delete(self.person.id,
            function() {
               toaster.pop("success", "Changes saved", "Item deleted", 2000);
               $location.path("/");
            },
            // WS Failure
            function (url) {
               toaster.pop("error", "Web Service call failed", "save " + url + " failed.");
            }
         );
      };

      // Save button handler - Save changes and switch to view screen for this document
      self.save = function () {
         httpFactory.update(self.person,
            function(id) {
               toaster.pop("success", "Changes saved", "Your review changes have been saved", 2000);
               $location.path("/view/" + id);
            },
            // WS Failure
            function (url) {
               toaster.pop("error", "Web Service call failed", "save " + url + " failed.");
            }
         );
      };
   };

   // Register our controller
   angular.module("angularcrud")
   .controller("EditController", ["$routeParams", "$location", "httpFactory", "toaster", EditController]);
})();
