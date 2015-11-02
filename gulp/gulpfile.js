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

// Location of our Oracle httpFactory.
var javaHttpFactory = '../web/scripts/services/httpFactory.java.js';

// Location of our Elastic httpFactory.
var elasticHttpFactory = '../web/scripts/services/httpFactory.elastic.js';


// All of our application .js files
var jsAppFiles = [
   "../public_html/scripts/app.js",
   "../public_html/scripts/config/routes.js",
   "../public_html/scripts/config/constants.js",            // This is before run.js as this may reset default constant values
   "../public_html/scripts/config/run.js",
   "../public_html/scripts/controllers/editController.js",
   "../public_html/scripts/controllers/listController.js",
   "../public_html/scripts/controllers/loadController.js",
   "../public_html/scripts/controllers/newController.js",
   "../public_html/scripts/controllers/settingsController.js",
   "../public_html/scripts/controllers/viewController.js",
   "../public_html/scripts/filters/titleCase.js"
// "../public_html/scripts/services/httpFactory.js"         // Will be added on the task line
];

/* All of our library .js files. Angular, jquery and bootstrap are first in case other libs have
 * dependencies. The rest of the libs are in alphabetic order.
 */
var jsLibFiles = [
   "../public_html/lib/angular.js",
   "../public_html/lib/jquery.js",
   "../public_html/lib/bootstrap.js",
   "../public_html/lib/angular-animate.js",
   "../public_html/lib/angular-busy.js",
   "../public_html/lib/angular-messages.js",
   "../public_html/lib/angular-route.js",
   "../public_html/lib/moment.js",
   "../public_html/lib/pdfmake.js",
   "../public_html/lib/toaster.js",
   "../public_html/lib/ui-bootstrap-tpls.js",
   "../public_html/lib/ui-grid.js",
   "../public_html/lib/vfs_fonts.js"
];

/* All of our .css files (includes Bootstrap extensions). Note in increasing order of importance as css will
 * override previous settings.
 */
var cssFiles = [
    "../public_html/css/bootstrap.css",     // Bootstrap is foundational
    "../public_html/css/app.css",           // However we may do some overrides
    "../public_html/css/angular-busy.css",
    "../public_html/css/toaster.css",
    "../public_html/css/ui-grid.css"
];


/* Concatenate all of our application .js files */

// Java WS - Debug mode
gulp.task("debug-app-js-java", function() {
    jsAppFiles[jsAppFiles.length] = javaHttpFactory;     // Add our java httpFactory to our .js file list.
    return gulp.src(jsAppFiles)                          // Add our custom .js files
               .pipe(concat("AngularCRUDApp.debug.js"))  // Concatenate all .js files
               .pipe(gulp.dest("../web/dist"));              // Put it in our dist folder
});

// Java WS - Release mode
gulp.task("release-app-js-java", function() {
    jsAppFiles[jsAppFiles.length] = javaHttpFactory;     // Add our java httpFactory to our .js file list.
    return gulp.src(jsAppFiles)                          // Add our custom .js files
               .pipe(concat("AngularCRUDApp.min.js"))    // Concatenate all .js files
               .pipe(uglify())                           // Minify all .js files
               .pipe(gulp.dest("../web/dist"));              // Put it in our dist folder
});

// Elastic DB/Hosting/WS - Debug mode
gulp.task("debug-app-js-elastic", function() {
    jsAppFiles[jsAppFiles.length] = elasticHttpFactory;  // Add our Elastic httpFactory to our .js file list.
    return gulp.src(jsAppFiles)                          // Add our custom .js files
               .pipe(concat("AngularCRUDApp.debug.js"))  // Concatenate all .js files
               .pipe(gulp.dest("../web/dist"));              // Put it in our dist folder
});

// Elastic DB/Hosting/WS - Release mode
gulp.task("release-app-js-elastic", function() {
    jsAppFiles[jsAppFiles.length] = elasticHttpFactory;  // Add our Elastic httpFactory to our .js file list.
    return gulp.src(jsAppFiles)                          // Add our custom .js files
               .pipe(concat("AngularCRUDApp.min.js"))    // Concatenate all .js files
               .pipe(uglify())                           // Minify all .js files
               .pipe(gulp.dest("../web/dist"));              // Put it in our dist folder
});


/* Concatenate all of our library .js files */

// Debug mode
gulp.task("debug-libs-js", function() {
    return gulp.src(jsLibFiles)                          // Add our .js files
               .pipe(concat("AngularCRUDLibs.debug.js")) // Concatenate all .js files
               .pipe(gulp.dest("../web/dist"));              // Put it in our dist folder
});

// Release mode
gulp.task("release-libs-js", function() {
    return gulp.src(jsLibFiles)                          // Add our .js files
               .pipe(concat("AngularCRUDLibs.debug.js")) // Concatenate all .js files
               .pipe(uglify())                           // Minify all .js files
               .pipe(gulp.dest("../web/dist"));              // Put it in our dist folder
});


/* Concatenate all of our CSS files */

// Debug mode
gulp.task("debug-css", function () {
    return gulp.src(cssFiles)                            // Get our css files (by directory and/or file name)
               .pipe(gulpFilter("**/*.css"))             // Make sure we have just .css files (for directory globbing)
               .pipe(basename({prefix: "../angularcrud/assets"}))    // Add "../assets" base name to CSS URLs (all images and fonts must be here)
               .pipe(concatCss("AngularCRUD.debug.css")) // Concatenate all .css files.
               .pipe(gulp.dest("../web/dist"));              // Put it with our other Bootstrap .css files.
});

// Release mode
gulp.task("release-css", function () {
    return gulp.src(cssFiles)                            // Get our css files (by directory and/or file name)
               .pipe(gulpFilter("**/*.css"))             // Make sure we have just .css files (for directory globbing)
               .pipe(basename({prefix: "../assets"}))    // Add "../assets" base name to CSS URLs (all images and fonts must be here)
               .pipe(concatCss("AngularCRUD.min.css"))   // Concatenate all .css files.
               .pipe(cssmin())                           // Minify all .css files.
               .pipe(gulp.dest("../web/dist"));              // Put it with our other Bootstrap .css files.
});


/* Run Tests */

// Protractor E2E tests
gulp.task("e2e-test", function() {
    return gulp.src(["../test/e2e/**/spec.*.js"]) // Pass in our spec files.
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
gulp.task("deployES", ["debug-app-js-elastic", "debug-libs-js", "debug-css"], function() {
    return gulp
      // Select all runtime files - concatenated CSS/JS/Libs and our html
      .src(["../web/dist/*", "../web/**/*.html", "../web/a**/*", "../web/sample**/*"])
      // Copy it all to our Eelasticsearch app plugin folder
      .pipe(gulp.dest("c:/users/jshea/apps/elasticsearch/plugins/angularcrud/_site"));
});



// Debug build without tests (call "gulp" to run).
gulp.task("default", ['debug-app-js-java', 'debug-libs-js', 'debug-css']);

// Debug build with all tests (call "gulp debug-test").
gulp.task("debug-test-all", ["default", "e2e-test", "unit-test"]);

// Debug build with e2e tests only (call "gulp debug-test-e2e").
gulp.task("debug-test-e2e", ["default", "e2e-test"]);

// Debug build with unit tests only (call "gulp debug-test-unit").
gulp.task("debug-test-unit", ["default", "unit-test"]);

// Release build (call "gulp release" to run). No tests.
gulp.task("release", ["release-app-js", "release-libs-js", "release-css"]);
