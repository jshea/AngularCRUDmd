# Gulp

[Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) is an automation tool also know as a task runner, like the Ant and Maven tools for Java. Gulp has a very rich set of [plugins](http://gulpjs.com/plugins/) and documentation including my favorite, [recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes). Books, blogs, videos and other training resources galore are available.

## Overview
>Gulp is a streaming build system, by using node’s streams file manipulation is all done in memory, and a file isn’t written until you tell it to do so.
>
>Gulp is a javascript task runner. Gulp however prefers code over configuration. Being that your tasks are written in code, gulp feels more like a build framework, giving you the tools to create tasks that fit your specific needs.
>
> [Automate your tasks easily with Gulp.js](https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js)

Common tasks that one can perform with a task runner/build system include:
* Testing - Unit tests and end-to-end (e2e)
* Concatenation
* Minification
* Compilation
* Interaction with Source Code Control (SCC) systems - Git, Subversion
* Backup
* Deployment
* File system manipulation

A couple of these are described below.
### Concatenation
>Reducing the number of requests is effective in optimizing a site because no matter how small the file is, every single request the browser makes takes at least 20 ms, and could take upwards of 100 ms or more.That’s not very long, but most websites are made up of hundreds of images, scripts, stylesheets, and other assets. An event repeated dozens or hundreds of times, even if only 20 ms, adds up to a serious impact on performance.
>
>[How Does Reducing JavaScript Requests & Minifying JavaScript Impact Site Performance?](http://www.yottaa.com/blog/application-optimization/bid/259514/How-Does-Reducing-JavaScript-Requests-Minifying-JavaScript-)

### Minification
>Minification (also minimisation or minimization), in computer programming languages and especially JavaScript, is the process of removing all unnecessary characters from source code without changing its functionality. These unnecessary characters usually include white space characters, new line characters, comments, and sometimes block delimiters, which are used to add readability to the code but are not required for it to execute.
>
>Minified source code is especially useful for interpreted languages deployed and transmitted on the Internet (such as JavaScript), because it reduces the amount of data that needs to be transferred. Minified source code may also be used as a kind of obfuscation, though the term obfuscation may be distinguished as a form of false cryptography while a minified code instance may be reversed using a pretty-printer.
>
>[Wikipedia](https://en.wikipedia.org/wiki/Minification_(programming))

### In practice
Here is the EBIS Timecard application. Before concatenation and minification the web page is 2.8mb and requires 253 requests from the browser to the server.

![](ConcantenationMinification.Before.png)

## Resources
* [Automate your tasks easily with Gulp.js](https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js)
* [What is Gulp.js and why use it](http://brandonclapp.com/what-is-gulp-js-and-why-use-it/)
* [How Does Reducing JavaScript Requests & Minifying JavaScript Impact Site Performance?](http://www.yottaa.com/blog/application-optimization/bid/259514/How-Does-Reducing-JavaScript-Requests-Minifying-JavaScript-)
* The [source](https://www.google.com/webhp?q=gulp.js) of all knowledge

## Installation
Gulp uses the Node Package Manager (npm) for its installation as well as its plugins.
`npm install --global gulp`

### Netbeans support
Gulp support has been added in Netbeans [8.1](https://netbeans.org/community/releases/81/) (currently in beta, planned for release in October 2015). Gulp can also be run at the command line as described below.


## Usage
The following are a basic simple setup. The processes and tasks for a large production system will be a bit more complex.

### Config file
#### package.json
```json
{
  "name": "GulpDependencies",
  "version": "0.1.0",
  "devDependencies": {
    "gulp": "^3.9.0",
    "gulp-concat": "^2.6.0",
    "gulp-concat-css": "^2.2.0",
    "gulp-cssmin": "^0.1.7",
    "gulp-filter": "^3.0.0",
    "gulp-uglify": "^1.2.0"
  }
}
```
### Sample Gulp file
#### gulpfile.js
```javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin');
var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

// Identify all of our custom .js files (This is an AngularJS app).
var jsFiles = [
   '../controllers/app.js',   // We want our main file loaded first. This defines our Angular module.
   '../controllers/*',
   '../services/*',
   '../directives/*',
   '../lib/*'
];

// Identify all of our .css files (includes Bootstrap extensions).
var cssFiles = ['../css/*'];

// Define a task to copy our HTML files to dist
gulp.task('html', function () {
   return gulp
           .src('../views/*')                   // Our HTML include files
           .pipe(gulpFilter('**/*.html'))       // Make sure we have just .html files (for directory globbing)
           .pipe(gulp.dest('../dist/views'));   // Put it a level under index.html
});

// Define a task named "js" that will annotate, concatenate, and minify all of our JavaScript files.
gulp.task('js', function () {
   return gulp
           .src(jsFiles)                        // Add our custom .js files to our Bower files
           .pipe(gulpFilter('**/*.js'))         // Make sure we have just .js files (for directory globbing)
           .pipe(ngAnnotate())                  // Annotate AngularJS files
           .pipe(concat('app.min.js'))          // Concatenate all .js files to app.min.js
           .pipe(uglify())                      // Minify all .js files
           .pipe(gulp.dest('../dist'));         // Put it in our dist folder
});

// Define a task that will concatenate and minify all of our CSS files.
gulp.task('css', function () {
   return gulp
           .src(cssFiles)                       // Get our css files (by directory and/or file name)
           .pipe(gulpFilter('**/*.css'))        // Make sure we have just .css files (for directory globbing)
           .pipe(concatCss('app.min.css'))      // Concatenate all .css files.
           .pipe(cssmin())                      // Minify all .css files.
           .pipe(gulp.dest('../dist'));         // Put it with our other Bootstrap .css files.
});

// Define a task that will copy our fonts to our dist folder
gulp.task('fonts', function () {
   return gulp
           .src('fonts')                        // Get all of our font files
           .pipe(gulp.dest('../dist'));         // Paste the font files to our dist file
});

/*
 * Define a default task named "default". 
 * 
 * Tasks can be run individually by name or we can run a default task (called when you run
 * `gulp` from cli). This task will run all other tasks defined in this file.
 */
gulp.task('default', ['html', 'js', 'css', 'fonts']);
```

### Running Gulp
This is an example of running the default gulp task that will
```
Y:\Development\Projects\TimecardReview\web\gulp>gulp
[14:53:58] Using gulpfile Y:\Development\Projects\TimecardReview\web\gulp\gulpfile.js
[14:53:58] Starting 'html'...
[14:53:58] Starting 'js'...
[14:53:58] Starting 'css'...
[14:53:58] Starting 'fonts'...
[14:53:58] Finished 'fonts' after 17 ms
[14:54:03] Finished 'css' after 5.17 s
[14:54:04] Finished 'html' after 5.34 s
[14:54:24] Finished 'js' after 26 s
[14:54:24] Starting 'default'...
[14:54:24] Finished 'default' after 15 µs

Y:\Development\Projects\TimecardReview\web\gulp>
```