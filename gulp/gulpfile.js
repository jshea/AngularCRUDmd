/* global require */

// AngularCRUD: gulpfile.js

var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var cssmin = require("gulp-cssmin");
var gulpFilter = require("gulp-filter");
var concatCss = require("gulp-concat-css");
var basename = require("gulp-css-url-basename");
var protractor = require("gulp-protractor").protractor;
var karma = require("gulp-karma");

/*   Custom paths   */
var javaHttpFactory    = "../web/scripts/services/httpFactory.java.js";                  // Location of the Java version of httpFactory
var elasticHttpFactory = "../web/scripts/services/httpFactory.elastic.js";               // Location of the Elasticsearch version of httpFactory
var elasticPluginPath  = "c:/users/jshea/apps/elasticsearch/plugins/angularcrud/_site";  // Path to the elasticsearch plugin. Used for ES hosting.


// All of our application .js files
var jsAppFiles = [
   "../web/scripts/app.js",
   "../web/scripts/config/routes.js",
   "../web/scripts/config/constants.js",            // This is before run.js as this may reset default constant values
   "../web/scripts/config/run.js",
   "../web/scripts/controllers/editController.js",
   "../web/scripts/controllers/listController.js",
   "../web/scripts/controllers/loadController.js",
   "../web/scripts/controllers/newController.js",
   "../web/scripts/controllers/settingsController.js",
   "../web/scripts/controllers/viewController.js",
   "../web/scripts/filters/titleCase.js"
//       One of these will be added in the build tasks
// "../web/scripts/services/httpFactory.java.js"
// "../web/scripts/services/httpFactory.elastic.js"
];

/* All of our library .js files. Angular, jquery and bootstrap are first in case other libs have
 * dependencies. The rest of the libs are in alphabetic order.
 */
var jsLibFiles = [
   "../web/lib/angular.js",
   "../web/lib/jquery.js",
   "../web/lib/bootstrap.js",
   "../web/lib/angular-animate.js",
   "../web/lib/angular-busy.js",
   "../web/lib/angular-messages.js",
   "../web/lib/angular-route.js",
   "../web/lib/moment.js",
   "../web/lib/ng-table.js",
   "../web/lib/pdfmake.js",
   "../web/lib/toaster.js",
   "../web/lib/ui-bootstrap-tpls.js",
   "../web/lib/ui-grid.js",
   "../web/lib/vfs_fonts.js"
];

/* All of our .css files (includes Bootstrap extensions). Note in increasing order of importance as css will
 * override previous settings.
 */
var cssFiles = [
    "../web/css/bootstrap.css",     // Bootstrap is foundational
    "../web/css/app.css",           // However we may do some overrides
    "../web/css/angular-busy.css",
    "../web/css/ng-table.css",
    "../web/css/toaster.css",
    "../web/css/ui-grid.css"
];


/* Concatenate all of our application .js files */

// Java WS - Debug mode
gulp.task("debug-app-js-java", function() {
   jsAppFiles[jsAppFiles.length] = javaHttpFactory;     // Add our java httpFactory to our .js file list.
   return gulp.src(jsAppFiles)                          // Add our custom .js files
              .pipe(concat("AngularCRUDApp.debug.js"))  // Concatenate all .js files
              .pipe(gulp.dest("../web/dist"));          // Put it in our dist folder
});

// Java WS - Release mode
gulp.task("release-app-js-java", function() {
   jsAppFiles[jsAppFiles.length] = javaHttpFactory;     // Add our java httpFactory to our .js file list.
   return gulp.src(jsAppFiles)                          // Add our custom .js files
              .pipe(concat("AngularCRUDApp.min.js"))    // Concatenate all .js files
              .pipe(uglify())                           // Minify all .js files
              .pipe(gulp.dest("../web/dist"));          // Put it in our dist folder
});

// Elastic DB/Hosting/WS - Debug mode
gulp.task("debug-app-js-elastic", function() {
   jsAppFiles[jsAppFiles.length] = elasticHttpFactory;  // Add our Elastic httpFactory to our .js file list.
   return gulp.src(jsAppFiles)                          // Add our custom .js files
              .pipe(concat("AngularCRUDApp.debug.js"))  // Concatenate all .js files
              .pipe(gulp.dest("../web/dist"));          // Put it in our dist folder
});

// Elastic DB/Hosting/WS - Release mode
gulp.task("release-app-js-elastic", function() {
   jsAppFiles[jsAppFiles.length] = elasticHttpFactory;  // Add our Elastic httpFactory to our .js file list.
   return gulp.src(jsAppFiles)                          // Add our custom .js files
              .pipe(concat("AngularCRUDApp.min.js"))    // Concatenate all .js files
              .pipe(uglify())                           // Minify all .js files
              .pipe(gulp.dest("../web/dist"));          // Put it in our dist folder
});


/* Concatenate all of our library .js files */

// Debug mode
gulp.task("debug-libs-js", function() {
   return gulp.src(jsLibFiles)                          // Add our .js files
              .pipe(concat("AngularCRUDLibs.debug.js")) // Concatenate all .js files
              .pipe(gulp.dest("../web/dist"));          // Put it in our dist folder
});

// Release mode
gulp.task("release-libs-js", function() {
   return gulp.src(jsLibFiles)                          // Add our .js files
              .pipe(concat("AngularCRUDLibs.debug.js")) // Concatenate all .js files
              .pipe(uglify())                           // Minify all .js files
              .pipe(gulp.dest("../web/dist"));          // Put it in our dist folder
});


/* Concatenate all of our CSS files */

// Debug mode
gulp.task("debug-css", function () {
   return gulp.src(cssFiles)                            // Get our css files (by directory and/or file name)
              .pipe(gulpFilter("**/*.css"))             // Make sure we have just .css files (for directory globbing)
              .pipe(basename({prefix: "../assets"}))    // Add "../assets" base name to CSS URLs (all images and fonts must be here)
              .pipe(concatCss("AngularCRUD.debug.css")) // Concatenate all .css files.
              .pipe(gulp.dest("../web/dist"));          // Put it with our other Bootstrap .css files.
});

// Release mode
gulp.task("release-css", function () {
   return gulp.src(cssFiles)                            // Get our css files (by directory and/or file name)
              .pipe(gulpFilter("**/*.css"))             // Make sure we have just .css files (for directory globbing)
              .pipe(basename({prefix: "../assets"}))    // Add "../assets" base name to CSS URLs (all images and fonts must be here)
              .pipe(concatCss("AngularCRUD.min.css"))   // Concatenate all .css files.
              .pipe(cssmin())                           // Minify all .css files.
              .pipe(gulp.dest("../web/dist"));          // Put it with our other Bootstrap .css files.
});


/* Run Tests */

// Protractor E2E tests
gulp.task("e2e-test", function() {
   return gulp.src(["../test/e2e/**/spec.*.js"])         // Pass in our spec files.
              .pipe(protractor({
                    seleniumServerJar: "node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar", // Local location of Selenium.
                    configFile: "../test/e2e/config.js", // Our Protractor config file.
                    args: ["--baseUrl", "http://localhost:7001"] // Test local for now. Can be switched here if needed.
               }))
              .on("error", function(e) { throw e; });
});

// Karma/Jasmine Unit tests
gulp.task("unit-test", function() {
   return gulp.src("./foobar") // ISSUE: https://github.com/lazd/gulp-karma/issues/9
              .pipe(karma({
                    configFile: "../test/unit/karma.conf.js",
                    action: "run"
              }))
              .on("error", function(e) { throw e; });
});


// Debug build with all tests (call "gulp debug-test")
gulp.task("debug-test-all", ["default", "e2e-test", "unit-test"]);


// Deploy the application to our Elasticsearch plugin
gulp.task("deploy-elastic", ["debug-app-js-elastic", "debug-libs-js", "debug-css"], function() {
   return gulp
      // Select all runtime files - concatenated CSS/JS/Libs and our html
      .src(["../web/dist/*", "../web/**/*.html", "../web/a**/*", "../web/sample**/*"])

      // Copy it all to our Elasticsearch app plugin folder, appropriate path was set above in a variable.
      .pipe(gulp.dest(elasticPluginPath));
});



// Debug build without tests (call "gulp" to run).
gulp.task("default", ["debug-app-js-java", "debug-libs-js", "debug-css"]);

// Debug build with all tests (call "gulp debug-test").
gulp.task("debug-test-all", ["default", "e2e-test", "unit-test"]);

// Debug build with e2e tests only (call "gulp debug-test-e2e").
gulp.task("debug-test-e2e", ["default", "e2e-test"]);

// Debug build with unit tests only (call "gulp debug-test-unit").
gulp.task("debug-test-unit", ["default", "unit-test"]);

// Release build (call "gulp release" to run). No tests.
gulp.task("release", ["release-app-js", "release-libs-js", "release-css"]);
