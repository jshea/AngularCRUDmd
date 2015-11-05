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

// Set a default REST WS URL - Sample as a constant. This app sets it in the
// two httpFactory files.
// 
//   angular.module("angularcrud").constant("URL", ); // Java/Jersey
})();
