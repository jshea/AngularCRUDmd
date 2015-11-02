"use strict";

describe("httpFactorySpec", function() {
   var httpFactory, httpBackend, URL;

   beforeEach(module("angularcrud"));

   beforeEach(inject(function(_httpFactory_, $httpBackend, $injector) {
      httpFactory = _httpFactory_;
      httpBackend = $httpBackend;
      URL = $injector.get("URL");
   }));

   it ("should be true", function() {
      expect(true).toBe(true);
   });
});