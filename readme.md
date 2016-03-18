
# AngularCRUD

This is a sample AngularJS client application supporting both a Java middle tier/RDBMS backend as well as  Elasticsearch as the middle tier/data base.  These architectures are incorporated because
* Elasticsearch makes a great development platform as it's the easiest to download, install, configure and run. This allows the repo to concentrate on sharing AngularJS knowledge and be the basis for business/CRUD applications.
* Java middle tier with a RDBMS backend happens to be the architecture of my day job.

Platform specific notes and artifacts are contained in the doc folder.

This example application demonstrates CRUD (Create, Report, Update and Delete) operations on a simple data model of a person (name, address, phone numbers...). It's a SPA (Single Page Application) built with the AngularJS 1.x framework and Material Design. AngularJS is the Single Page Application framework and Material Design provides UI formatting and components.

This is setup as a [NetBeans](https://netbeans.org/) project. While any IDE or text editor can be used to work with the source of this application, it's setup with the Netbeans default folder structure.

## Overview
The doc folder contains documentation on the overall application, tools and technologies used, installation and configuration instructions as well as information on additional backend technologies that can be used.

### Technology and Tools
#### AngularJS
[AngularJS](http://angularjs.org) is a web application framework for building what's commonly called SPA's ([Single Page Applications](https://en.wikipedia.org/wiki/Single-page_application)). It is an Open Source project managed by the [Mountain View Chocolate Factory](http://google.com) .
#### Material Design
[Material Design](https://material.angularjs.org/) "For developers using AngularJS, Angular Material is the reference implementation of Google's Material Design Specification. This project provides a set of reusable, well-tested, and accessible UI components based on Material Design.".
#### NetBeans
[NetBeans](https://netbeans.org/) is an Open Source IDE that has good Java and SPA support. The latest versions has built in support for AngularJS, Cordova and many other Web application development technologies, frameworks and libraries.

## Folders and files in the application
The following is a quick tour of the folders and files that comprise the application. Not every folder and file
is listed here, just the highlights.

File|Description
----|------------
.gitignore | Files and folders to exclude from git. This includes build and dist folders used in building the application, bower_components which is a cached folder contains downloaded JavaScript libraries and various node_module folders containing tools dependencies.
bower.json | Bower is a tool for fetching and saving library files used by our SPA. These are downloaded to the bower_components folder that isn't committed to git.
build.xml | The ant build file for Netbeans. 
readme.md | This is the file you're reading!
todo.md | Things I need to get around to.
\doc | Documentation for this application. Subfolders contain scripts for creating the RDBMS objects, loading data and other misc documentation.
\gulp | The web application (Javascript, HTML, CSS) build system.
\lib | Libraries for the Java\Jersey REST web service middle tier for access to a RDBMS data store. Not used when using Elasticsearch.
\nbproject | Netbeans settings files, not normally edited by a developer.
\src  | Java source code for the Java\Jersey REST web service middle tier for access to a RDBMS data store. Not used when using Elasticsearch.
\test | Test infrastructure for the Java\Jersey middle tier, application front end and end-to-end application testing.
\web | The client portion of the application. This is the AngularJS/Bootstrap SPA.

## Contributors
The following people have contributed to this effort:
* [Chris Camargo](https://github.com/camargo)