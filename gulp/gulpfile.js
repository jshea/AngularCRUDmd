/*
 * This is the build and test running file for gulp. This is a streamlined version for demo purposes. A fuller
 * version supporting minification and multiple backends (oracle and elastic) should be in the same folder
 * with the name gulpfile.full.js
 */

// Load all the gulp and testing libraries we'll be using in this gulp file
var gulp = require("gulp");
var concat = require("gulp-concat");
var gulpFilter = require("gulp-filter");
var concatCss = require("gulp-concat-css");
var basename = require("gulp-css-url-basename");
var protractor = require("gulp-protractor").protractor;
var karma = require("gulp-karma");


// All of our application .js files
var jsAppFiles = [
   "../web/scripts/app.js",
   "../web/scripts/config/routes.js",
   "../web/scripts/config/constants.js",            // This is before run.js as this may reset default constant values
   "../web/scripts/config/run.js",
   "../web/scripts/filters/phoneNumber.js",
   "../web/components/PersonEdit/personEdit.js",
   "../web/components/PersonList/personList.js",
   "../web/components/PersonView/personView.js",
   "../web/scripts/controllers/editController.js",
   "../web/scripts/controllers/listController.js",
   "../web/scripts/controllers/loadController.js",
   "../web/scripts/controllers/newController.js",
   "../web/scripts/controllers/settingsController.js",
   "../web/scripts/controllers/viewController.js",
   "../web/scripts/filters/titleCase.js",
   "../web/scripts/services/httpFactory.java.js",
   "../web/scripts/services/UtilityService.js"
];

/* All of our library .js files. Angular, jquery and bootstrap are first in case other libs have
 * dependencies. The rest of the libs are in alphabetic order.
 */
var jsLibFiles = [
   "../web/lib/angular.js",
   "../web/lib/angular-aria.js",
   "../web/lib/angular-animate.js",
   "../web/lib/angular-material.js",
   "../web/lib/angular-messages.js",
   "../web/lib/angular-route.js",
   "../web/lib/jquery.js",
   "../web/lib/moment.js"
];

/* All of our .css files (includes Bootstrap extensions). Note in increasing order of importance as css will
 * override previous settings.
 */
var cssFiles = [
   "../web/css/angular-material.css",
   "../web/css/app.css"
];


/*   Concatenate   */

// application .js files
gulp.task("app-js-java", function() {
   return gulp.src(jsAppFiles)                              // Add our custom .js files
              .pipe(concat("AngularCRUDmdApp.debug.js"))    // Concatenate all .js files
              .pipe(gulp.dest("../web/dist"));              // Put it in our dist folder
});

// third party library .js files
gulp.task("libs-js", function() {
   return gulp.src(jsLibFiles)                              // Add our .js files
              .pipe(concat("AngularCRUDmdLibs.debug.js"))   // Concatenate all .js files
              .pipe(gulp.dest("../web/dist"));              // Put it in our dist folder
});

// CSS files - ours and 3rd party
gulp.task("css", function () {
   return gulp.src(cssFiles)                                // Get our css files (by directory and/or file name)
              .pipe(gulpFilter("**/*.css"))                 // Make sure we have just .css files (for directory globbing)
              .pipe(basename({prefix: "../assets"}))        // Add "../assets" base name to CSS URLs (all images and fonts must be here)
              .pipe(concatCss("AngularCRUDmd.debug.css"))   // Concatenate all .css files.
              .pipe(gulp.dest("../web/dist"));              // Put it with our other Bootstrap .css files.
});


/* Run Tests */

// Karma/Jasmine Unit tests
gulp.task("unit-test", function() {
   return gulp.src("./foobar") // ISSUE: https://github.com/lazd/gulp-karma/issues/9
              .pipe(karma({
                    configFile: "../test/unit/karma.conf.js",
                    action: "run"
              }))
              .on("error", function(e) { throw e; });
});

// Protractor E2E tests
gulp.task("e2e-test", function() {
   return gulp.src(["../test/e2e/**/spec.*.js"])         // Pass in our spec files.
              .pipe(protractor({
                    seleniumServerJar: "node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar", // Local location of Selenium.
                    configFile: "../test/e2e/config.js",          // Our Protractor config file.
                    args: ["--baseUrl", "http://localhost:7001"]  // Test local for now. Can be switched here if needed.
               }))
              .on("error", function(e) { throw e; });
});


/*   These are the "summary" tasks that are typically run at the command line   */

// Build without tests
gulp.task("default", ["app-js-java", "libs-js", "css"]);

// Build and run all tests
gulp.task("test", ["default", "e2e-test", "unit-test"]);

// Build and run e2e tests
gulp.task("test-e2e", ["default", "e2e-test"]);

// Build and run unit tests
gulp.task("test-unit", ["default", "unit-test"]);
