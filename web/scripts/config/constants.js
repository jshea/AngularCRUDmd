/* global angular */

(function() {

   "use strict";

   // Define our application constants here

   // Initial angularcrud data. Used by httpFactory to reload dummy/sample data.
   angular.module("angularcrud").constant("SAMPLEDATA", [
      {"firstName": "Fred",  "lastName": "Flintstone"},
      {"firstName": "Wilma", "lastName": "Flintstone"},
      {"firstName": "Barney","lastName": "Rubble"},
      {"firstName": "Betty", "lastName": "Rubble"}
   ]);

// Set a default URL
//   angular.module("angularcrud").constant("URL", "ws/review/"); // Java/Jersey
   angular.module("angularcrud").constant("WS_URL", "http://localhost:9200/angularcrud/person/");   // Elastic
})();
