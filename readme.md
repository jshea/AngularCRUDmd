
# AngularCRUD

**Note** *This repo is undergoing reorganization. Multiple versions of this application with different backends (Java WS & Oracle db, Firebase, MongoDB and Elasticsearch) are being consolidated. Additionally more enterprise application layouts  and features (directives, components and 3rd party widgets) are being incorporated.*

This reorganization will result in a single AngularJS client application supporting both a Java middle tier/RDBMS backend as well as  Elasticsearch as the middle tier/data base. Elasticsearch makes a great development platform as it's the easiest to download, install, configure and run. This allows the repo to concentrate on sharing AngularJS knowledge and be the basis for business/CRUD applications. Other backends will have notes and artifacts under the doc folder.

This is an example application that demonstrates CRUD (Create, Report, Update and Delete) operations on a simple data model of a person (name, address, phone numbers...). It's a SPA (Single Page Application) built with the AngularJS and Bootstrap frameworks. AngularJS is the Single Page Application framework and Bootstrap provides UI formatting and components.

This is a [NetBeans](https://netbeans.org/) project. While any IDE or text editor can be used to work with the source of this application, it's setup with the Netbeans default folder structure.

## Technologies and Tools
### AngularJS
[AngularJS](http://angularjs.org) is a web application framework for building what's commonly called SPA's (Single Page Applications). It is an Open Source project managed by the [Mountain View Chocolate Factory](http://google.com) .
### Bootstrap
[Bootstrap](http://getbootstrap.com) is a web development framework for making applications responsive and enhancing UI functionality.
### NetBeans
[NetBeans](https://netbeans.org/) is an Open Source IDE that has good Java and SPA support. The latest versions has built in support for AngularJS, Cordova and many other Web application development technologies, frameworks and libraries.

## Folders and files in the application
The following is a quick tour of the folders and files that comprise the application. Not every folder and file
is listed here, just the highlights.

File|Description
----|------------
.gitignore | Files and folders to exclude from git.
bower.json | Bower is a tool for fetching and installing library files used by our SPA.
build.xml | The ant build file for Netbeans. 
readme.md | This is the file you're reading!
todo.md | Things I need to get around to.


### \doc
Scripts for creating the RDBMS objects, loading data and other misc documentation.

### \gulp
The web application (Javascript, HTML, CSS) build system.

### \lib
Libraries for the Java\Jersey REST web service middle tier for access to a RDBMS data store. Not used when using Elasticsearch.

### \nbproject
Netbeans settings files, not normally edited by a developer.

### \src
Java source code for the Java\Jersey REST web service middle tier for access to a RDBMS data store. Not used when using Elasticsearch.

### \test
Test infrastructure for the Java\Jersey middle tier, application front end and end-to-end application testing.

### \web
The client portion of the application. This is the AngularJS/Bootstrap SPA.

## Contributors
The following people have contributed to this effort:
[Chris Camargo](https://github.com/camargo)