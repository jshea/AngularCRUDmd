## Technology and tools used in this example application

### Overview
This application is built using web technologies HTML, JavaScript and CSS. It's intended to run in any current browser. It's generally tested with the latest versions of Chrome, FireFox and Microsoft Edge. 

This is an overview of the technologies and tools necessary to work with this project. More detailed howto/cheatsheets are available in the [doc/toolCheatsheets](toolCheatsheets) folder.

### Tools and libraries
* [Java](http://oracle.com/technetwork/java/javase/downloads/index.html) is required for Netbeans, WebLogic server and Elasticsearch. The latest JDK 8 is recommended.

* [Netbeans](https://netbeans.org/downloads/) is the Integrated Development Environment used for this project. Install the latest stable Java EE version. During the installation you will be given the option of installing Tomcat and Glassfish. This application doesn't require either program. For the Java/RDBMS stack we'll be discussing running in Oracle WebLogic Server.

* [git](https://git-scm.com/downloads) is used by this project. While one can click the GitHub `Download ZIP` button to get a non-version controlled copy of the project, I recommend learning [git](https://git-scm.com/doc).

* [AngularJS](https://angularjs.org/) is the core framework for this Single Page Application (SPA). We'll be using `bower` (see below) to get the AngularJS library files for this application. 
This application is using version 1.4.x of AngularJS. Angular v2 is a significant update scheduled for release in 2016. This application will be updated to Angular v2 sometime after its release. For now we can ignore Angular v2.

* [Bootstrap](http://getbootstrap.com/)  is the core UI framework for styling and widgets. We'll use `bower` (see below) to get the latest version of the libraries. 

* [NodeJS](https://nodejs.org/) provides the ability to run JavaScript programs at your Operating Systems command line. It also includes the Node Package Manager (npm) which is used to install several of the following supporting applications we'll be using. Download and install the latest stable release.

* [Elasticsearch](https://elastic.co/downloads/elasticsearch) is a database and analytics engine.

* [Bower](http://bower.io/) is a package manager that we'll use for downloading the libraries for our Angular client application.

* [Gulp](http://gulpjs.com/) is a task runner (like ant or make) that we'll use for building our client application, running tests and other tasks. Installed via `bower`.

* [Jasmine](http://jasmine.github.io/) is a JavaScript test framework installed via `bower`

* [Karma](http://karma-runner.github.io/) is a test runner for Jasmine. Installed via `bower`.

* [Protractor](http://protractortest.org/) is an end to end (e2e) test framework for Angular applications. It will run/test your application in a real browser as a user would. Installed via `bower`.

### Installation

Install the following applications via their installer:
* [Java](http://oracle.com/technetwork/java/javase/downloads/index.html)
* [Netbeans](https://netbeans.org/downloads/)
* [git](https://git-scm.com/downloads)
* [NodeJS](https://nodejs.org/)
* [Elasticsearch](https://elastic.co/downloads/elasticsearch)

Install the following applications with npm:
```
npm install -g bower
npm install -g gulp
npm install -g jasmine
npm install -g karma
npm install -g protractor
```
