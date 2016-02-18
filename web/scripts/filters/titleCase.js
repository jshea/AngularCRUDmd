/*
 * Angular filter to convert text to title case.
 */
(function() {

   "use strict";

   /*
    * Convert text (names) to TitleCase. Any letter following a space, dash or apostrophe is uppercased.
    */
   function TitleCase() {
      return function(input) {
         input = input || "";
         input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
         input = input.replace(/-./g,    function(txt){return txt.charAt(0) + txt.substr(1).toUpperCase();});
         input = input.replace(/\'./g,   function(txt){return txt.charAt(0) + txt.substr(1).toUpperCase();});
         return input;
      };
   }

   // Register our filter
   angular
      .module("angularcrud")
      .filter("titleCase", [TitleCase]);
})();
