(function() {
   "use strict";

   // Service that represents our PersonList object.
   function PersonListService(NgTableParams) {

      /*   PersonList properties   */
      this.personListData = null;   // List of person objects
      this.table = null;            // ngTable object

      // --- Utility functions for manipulating our data

      // Initialize or re-initialize the data
      this.init = function(data) {
         this.personListData = data;

         // Setup our ngTable with review history data contained in the audit param.
         this.table = new NgTableParams({count: this.personListData.length}, {dataset: this.personListData, counts: []});
      };

      // Log all of the PersonList properties.
      this.log = function() {
         console.log("--------- Person List LOG ------------");
         console.log("personListData: ", this.personListData);
         console.log("table: ", this.table);
         console.log("-----------------------------------------");
      };
   }

   angular.module("angularcrud")
      .service("PersonListService", ["NgTableParams", PersonListService]);
})();