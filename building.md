
# Building and Running the Java/RDBMS version of AngularCRUD

## Overview
The doc folder contains documentation on the overall application, tools and technologies used, installation and configuration instructions as well as information on additional backend technologies that can be used.

## Installation

### Middle Tier
Update PersonDAO.java with the unique id for your application. This will facilitate multiple people working with this application in the same database instance.

Update DBConnection.getConnection() with your database connection information:
### Backend
Update doc\PersonDDL.sql with the unique id for your application. This will allow separate tables for each user working in a common database instance.
```
conn = DriverManager.getConnection("jdbc:oracle:thin:@server:port:sid", "uid", "pw");
```

## Building and Deployment
Building the application is a combination of Gulp and compiling the tiers as a Java WAR file.

### Gulp
To build the application, just run `gulp` from the project's gulp folder. 
```
W:\Development\Projects\AngularCRUD\gulp> gulp
[13:48:47] Using gulpfile W:\Development\Projects\AngularCRUD\gulp\gulpfile.js
[13:48:47] Starting 'debug-app-js-java'...
[13:48:47] Starting 'debug-libs-js'...
[13:48:47] Starting 'debug-css'...
[13:48:47] Finished 'debug-css' after 368 ms
[13:48:47] Finished 'debug-app-js-java' after 403 ms
[13:48:47] Finished 'debug-libs-js' after 833 ms
[13:48:47] Starting 'default'...
[13:48:47] Finished 'default' after 21 µs
W:\Development\Projects\AngularCRUD\gulp>
```
This gulp task concatenates:
* JavaScript files we created into AngularCRUDApp.debug.js
* Third party libraries into AngularCRUDLibs.debug.js
* CSS files into AngularCRUD.debug.css

These three files are placed in the folder `AngularCRUD\web\dist`.

### Compiling the WAR
To compile a Java Web Archive (WAR file) that can be deployed to a Java Application Server (JBOSS, WebLogic, GlassFish...) we use the Netbeans IDE.

After running gulp to prepare the two js and one css file, 
* Run/Clean and Build Project
* or shift-F11
* or hammer and broom icon on the toolbar