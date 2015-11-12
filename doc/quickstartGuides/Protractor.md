# End to End (e2e) Testing with Protractor (which includes Jasmine, Selenium)
Overview from https://angular.github.io/protractor/
> Protractor is an end-to-end test framework for AngularJS applications. Protractor runs tests against your application running in a real browser, interacting with it as a user would.
>
> ## Test Like a User
Protractor is built on top of WebDriverJS, which uses native events and browser-specific drivers to interact with your application as a user would.
>
> ## For AngularJS Apps
Protractor supports Angular-specific locator strategies, which allows you to test Angular-specific elements without any setup effort on your part.
>
> ## Automatic Waiting
You no longer need to add waits and sleeps to your test. Protractor can automatically execute the next step in your test the moment the webpage finishes pending tasks, so you don’t have to worry about waiting for your test and webpage to sync.


## Installation

### NodeJS
Like most modern web development infrastructure, Protractor is installed and run via [NodeJS](https://nodejs.org/). NodeJS is a JavaScript runtime environment built around V8, the Google Chrome browser JavaScript engine. Installing NodeJS allows you to run JavaScript applications just like installing Perl/Python/Ruby to run apps in these languages.

A component of NodeJS is the Node Package Manager (npm) that simplifies installing libraries and applications from a central repository. npm is used to install Protractor and supporting libraries.

### Protractor
[Protractor](https://angular.github.io/protractor/#/) is installed via the Node Package Manager with the following commands:
```
npm install -g protractor  // Install Protractor
webdriver-manager update   // Install webdriver (Selenium) supporting files
```
You are now the owner of a shiny new installation of Protractor.

### Jasmine reporters
Jasmine has pluggable reporters that provide additional information on the status of your test and their results. The basic output from Protractor will tell you if tests passed or failed. These reporters will give more status and put a pretty face on bad news.

You may need to add your `node_modules` folder as an environment variable. I added the following environment variable for jasmine-spec-reporter to be found by Protractor:

    node_path=C:\Users\jshea\AppData\Roaming\npm\node_modules

#### jasmine-spec-reporter
Provides color coded detail at the command prompt.

    npm install -g jasmine-spec-reporter

#### protractor-html-screenshot-reporter
Creates a HTML report of the test status. Optionally will capture screen shots, linked from the HTML output, at the completion of each successful test and/or failed test.

    npm install -g protractor-html-screenshot-reporter     // Note does't work w/Jasmine 2


## Running Protractor
Protractor runs from the commandline and requires a config file (config.js) and one or more test specification files. The configuration file contains information including:
* how to find a Selenium server
* browsers to be used
* test script specification files
* optional reporters.

The test specification files contain the actual test script. Protractor is built on top of Selenium WebDriver and can be run against a Selenium server. One can also use an embedded copy of Selenium or a [cloud hosted service](https://saucelabs.com/).

We'll be using a local instance of Selenium running in its own shell. To run Protractor tests we need to start an instance of Selenium and use the Protractor program to run our config.js file.

    # Start an instance of Selenium Server
    webdriver-manager start

    # Run your tests
    protractor config.js

## A sample test script
The following is a sample test script for the new (in 2015) Timecard Review application. This test script:
* ensures the web app loaded
* has the basic elements on the page
* finds no data for an employee that isn't a supervisor
* finds data for a supervisor

### spec.directreports.js

```javascript
describe("Direct Reports", function() {
   var mgrBadgeNo = element(by.id("mgrBadgeNo"));
   var datePicker = element(by.id("datePicker"));
   var searchButton = element(by.id("searchButton"));

   // Setup - runs before each spec it(){}
   beforeEach(function() {
      /* Start each test will a clean version of the app. We clear the mgrBadgeNo
       * and datePicker as the app loads the previously used values from localStorage.
       */
      browser.get("timecardreview/");             // Is prefixed with baseUrl from config.js
      mgrBadgeNo.clear();
      datePicker.clear();
   });

   // Tear-down - runs after each spec it(){}
   afterEach(function() {

   });


   it("Startup without complaining", function() {
      // Check page title
      expect(browser.getTitle()).toEqual("Timecard Review");
      // Check input fields and data table exist
      expect(element(by.id("mgrBadgeNo")).isPresent()).toBe(true);
      expect(element(by.id("datePicker")).isPresent()).toBe(true);
      expect(element(by.id("drTable")).isPresent()).toBe(true);
   });


   it("Should find no direct reports for Jim/119600", function() {
      // Search on Jim for July 5 2015
      mgrBadgeNo.clear().sendKeys("119600");
      datePicker.clear().sendKeys("7/5/2015");
      searchButton.click();

      // Count the number of rows in the dr table
      var rows = element.all(by.repeater("dr in org.directReports"));

      // The table shouldn't have any data rows
      expect(rows.count()).toBe(0);
   });


   it("Should find 8 employees for Camille/113626", function() {
      // Search on Camille for July 5 2015
      mgrBadgeNo.clear().sendKeys("113626");
      datePicker.clear().sendKeys("7/5/2015");
      searchButton.click();

      // Rows will contain the dynamically created table rows
      var rows = element.all(by.repeater("dr in org.directReports"));
      expect(rows.count()).toBe(8);    // Should be 8 direct reports for this week

      // Check last row is Thu-Ha
      expect(rows.last().element(by.id("empLink8")).getText()).toBe("ThuHa N Truong"); // Using last()
      expect(rows.get(7).element(by.id("empLink8")).getText()).toBe("ThuHa N Truong"); // Using get(#) - not so robust
   });


   it("Navigate to employee detail screen", function() {
      // Search on Camille for July 5 2015
      mgrBadgeNo.clear().sendKeys("113626");
      datePicker.clear().sendKeys("7/5/2015");
      searchButton.click();

      // Rows will contain the dynamically created table rows
      var rows = element.all(by.repeater("dr in org.directReports"));

      // Load productive info screen for our last employee
      rows.last().element(by.id("empLink8")).click();

      // Check PI screen has the (some of the) requisite objects
      expect(element(by.id("piTable")).isPresent()).toBe(true);
      expect(element(by.id("pcTable")).isPresent()).toBe(true);
   });
});
```

## Sample config file for this test
### config.js
```javascript
exports.config = {

   framework: "jasmine2",        // Default is Jasmine 1.3, This will use jasmine 2.x
   seleniumAddress: "http://localhost:4444/wd/hub",
   specs: ["spec.*.js"],
   multiCapabilities: [
      { browserName: "firefox"},
      { browserName: "chrome" }
   ],
   baseUrl:
      "http://localhost:7001/",

   onPrepare: function() {
      // Terminal reporter - Enhances the command line output
      var SpecReporter = require("jasmine-spec-reporter");
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
   }

};
```