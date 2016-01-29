/* global expect, JTS */

'use strict';

describe('jtsUtilSpec', function() {
   it ('JTS should be defined', function() {
      expect(JTS).toBeDefined();
   });

   it ('toProperCase', function() {
      expect(JTS.toProperCase('hello, world')).toBe('Hello, World');
   });

   it ('formatPhoneNumber', function() {
      expect(JTS.formatPhoneNumber('')).toBe('');
      expect(JTS.formatPhoneNumber('354')).toBe('354');
      expect(JTS.formatPhoneNumber('354775')).toBe('354775');
      expect(JTS.formatPhoneNumber('3547751')).toBe('354-7751');
      expect(JTS.formatPhoneNumber('8183547751')).toBe('(818) 354-7751');
      expect(JTS.formatPhoneNumber('18183547751')).toBe('1 (818) 354-7751');
   });

   it ('getRandomInt', function() {
      var randomInt = JTS.getRandomInt(1, 5);
      expect(randomInt).toBeGreaterThan(0);
      expect(randomInt).toBeLessThan(6);

      randomInt = JTS.getRandomInt(1, 5);
      expect(randomInt).toBeGreaterThan(0);
      expect(randomInt).toBeLessThan(6);

      expect(JTS.getRandomInt()).toEqual(NaN);
      expect(JTS.getRandomInt(1)).toEqual(NaN);
   });
});