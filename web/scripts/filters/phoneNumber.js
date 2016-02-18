/*
 * Angular filter to format telephone numbers in US format
 */
(function () {

   'use strict';

   /*
    * Performs basic US phone number formatting if the number is
    * 7, 10 or 11 characters long.
    *
    * Returns an empty string for null or undefined values.
    */
   function FormatPhoneNumber() {

      return function (tel) {
         var formattedNumber = '';

         // If blank, null, undef - return an empty string
         if (!tel) {
            return '';
         }

         // Ensure it's a string and trim it while we're at it
         var value = tel.toString().trim();

         // If there's any non numeric digits, return the trimmed string
         if (value.match(/[^0-9]/)) {
            return tel;
         }

         // Format the phone number if it's 7, 10 or 11 chars long
         switch (value.length) {
            case 7:
               formattedNumber =
                  value.substr(1, 3) + '-' +
                  value.substr(4, 4);
               break;

            case 10:
               formattedNumber =
                  '(' +
                  value.substr(0, 3) + ') ' +
                  value.substr(3, 3) + '-' +
                  value.substr(6, 4);
               break;

            case 11:
               formattedNumber =
                  value.substr(0, 1) + ' (' +
                  value.substr(1, 3) + ') ' +
                  value.substr(4, 3) + '-' +
                  value.substr(7, 4);
               break;

            default:
               formattedNumber = value;
         }

         return formattedNumber;
      };
   }

   // Register our filter
   angular
      .module("angularcrud")
      .filter("phoneNumber", [FormatPhoneNumber]);
})();
