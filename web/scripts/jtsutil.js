/**
 * User: jshea
 * Date: 6/22/12
 * Time: 12:19 PM
 */
'use strict';
var JTS = JTS || {};            // Establish JTS namespace if it doesn't already exist


/*
 * Convert a string to initial cap. Returns an empty string for
 * null or undefined values.
 */
JTS.stripPhoneNumber = function (str) {
   // string has a non empty value, it's not '', undefined or null
   if (str) {
      str = str.replace(/\D/g, '');
      return str;
   }
   else {
      return '';
   }
};


/*
 * Convert a string to initial cap. Returns an empty string for
 * null or undefined values.
 */
JTS.toProperCase = function (string) {
   // string has a non empty value, it's not '', undefined or null
   if (string) {
      return string.replace(/\w\S*/g, function (txt) {
         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
   }
   else {
      return '';
   }
};


/*
 * Performs basic US phone number formatting if the number is
 * 7, 10 or 11 characters long.
 *
 * Returns an empty string for null or undefined values.
 */
JTS.formatPhoneNumber = function (phoneNumber) {
   // string doesn't have a value, it's undefined or null
   if (!phoneNumber) {
      return '';
   }
   else if (phoneNumber.length === 11) {
      return phoneNumber.substr(0, 1) + ' (' +
         phoneNumber.substr(1, 3) + ') ' +
         phoneNumber.substr(4, 3) + '-' +
         phoneNumber.substr(7, 4);
   }
   else if (phoneNumber.length === 10) {
      return '(' +
         phoneNumber.substr(0, 3) + ') ' +
         phoneNumber.substr(3, 3) + '-' +
         phoneNumber.substr(6, 4);
   }
   else if (phoneNumber.length === 7) {
      return phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4);
   }
   else {
      return phoneNumber;
   }
};


/*
 * Get a random number between min and max values
 *
 * Credit: Mozilla Developer Center
 */
JTS.getRandomInt = function (min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
};
