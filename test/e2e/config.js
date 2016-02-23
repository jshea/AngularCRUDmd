/* global exports, jasmine */

exports.config = {

   framework: "jasmine2",        // Default is Jasmine 1.3, This will use jasmine 2.x
   specs: ["controllers/spec.*.js"],
   multiCapabilities: [
//    { browserName: "firefox"},
      { browserName: "chrome" }
   ],

   onPrepare: function() {
      // Terminal reporter
      // https://github.com/bcaudan/jasmine-spec-reporter/blob/master/docs/protractor-configuration.md
      var SpecReporter = require("jasmine-spec-reporter");
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
   },

   jasmineNodeOpts: {
      defaultTimeoutInterval: 120000
   }

};
