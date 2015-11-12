# Cordova
## Overview
Cordova is a program that will build native mobile applications with the core application implementation written in HTML/JavaScrip/CSS. This allows combining web browser and mobile applications build from a single code base. For example we can build an AngularJS application that runs within a native Android or iOS application. In addition to creating standalone mobile versions of your application, Cordova provides interfaces to the mobile device features. With Cordova you can make phone calls, interact with device services (contacts, GPS, camera, battery status, motion sensor, compass...) and integrate with your own native (Android/Java or iOS/ObjectiveC) code.

## Building a mobile version of AngularCRUD with Cordova
For this example we're going to build an Android version of our application. Android tooling is available for Windows, OSX and Linux. Other mobile platforms have development OS requirements. For example iOS development can only be performed on OSX and Windows Phone development can only be performed on Windows.

This example uses \Users\YOUR_USER_NAME\Documents as the base folder for our web application source and the Cordova project. You can use any directory structure, this is just what I'm using for this example.

### 0 Install NodeJS
This is a one time operation. [NodeJS](http://nodejs.org/) is an application that runs JavaScript from the command line. Many web application development tools have adopted the NodeJS Package Manager (npm) tool for installing/configuring/updating themselves and their components.

If you haven't previously installed NodeJS, do so now.

### 1 Install the Android SDK
This is a one time operation for all projects. Download the [installer](http://developer.android.com/sdk/index.html#Other) for your platform in the `SDK Tools Only` section. The Cordova [Platform Guides](http://cordova.apache.org/docs/en/4.0.0/guide_platforms_index.md.html#Platform%20Guides) have information on the installation, configuration and usage of Android with Cordova.

    # Download and install the Andorid SDK
    #   Install platform version 19 (Android version 4.4.2) as that's what today's Cordova is happy with.
    #
    #   Add the Android SDK to your path
    #     ;C:\Program Files\Android\android-sdk\platform-tools;C:\Program Files\Android\android-sdk\tools

### 2 Install Cordova
This is a one time operation for all projects. Cordova is installed with the Node Package Manager (npm). NodeJS must be installed.

    npm install -g cordova

### 3 Create a top level folder for our Cordova projects
This is a one time operation for all projects. This is a top level folder that can contain multiple Cordova projects.

    mkdir \Users\USER_NAME\Documents\Cordova                  // Make a top level directory for our Cordova projects
    cd  \Users\USER_NAME\Documents\Cordova                    // CD to the Cordova projects parent folder

### 4 Create our Cordova project and initialize it with the Android platform.
This is a one time operation for this project. This creates the Cordova project and elements required to compile your web application as a mobile application.

    cordova create angularcrud com.mydomain.person AngularCRUD  // Create our Cordova project, parameters described below
    cd angularcrud                                              // Change directory to our new Cordova project
    cordova platform add android                                // Add the Android platform

Cordova arguments in the above example:
* angularcrud - Directory to be created (under \Users\USER_NAME\Documents\Cordova) for the project
* com.mydomain.person - Projects reverse domain-style identifier. Like a Java package name.
* AngularCRUD - Applications display title. This will be the Android projects application name.

### 5 Optional -Test that Cordova and the Android SDK are setup correctly
The `cordova create` command populated the projects www folder with a default web application. We can build this default application to test that everything so far is installed and running correctly. This allows us to test without introducing the variable of our web application.

    cordova build                                             // Compile default Cordova project as an Android executable
    cordova emulate android                                   // Run default project executable in the Android emulator
    cordova run android                                       // Optional - Deploy the executable to the attached Android device

### 6 Load our web application and compile to an Android apk
Now let's copy our web application into the Cordova project container and compile to an Android apk. Copying our web application files can be done at the command line, via the file explorer or a build tool like gulp. Here I'm going to show the command line commands to perform this task.

#### 6.1 Clear the default Cordova application
We need to delete the default web application created by Cordova from C:\Users\USER_NAME\Documents\Cordova\angularcrud\www. The cordova create command put these sample files in the Cordova\angularcrud\www folder. We are going to replace these template\demo files with our web application.

    del C:\Users\USER_NAME\Documents\Cordova\angularcrud\www

#### 6.2 Copy our AngularJS application and build
Copy our AngularJS application to C:\Users\USER_NAME\Documents\Cordova\CordovaCRUD\www. This assumes our web application run time files are in the folder AngularCRUD\web.

    copy \Users\USER_NAME\Documents\AngularCRUD\web \Users\USER_NAME\Documents\Cordova\CordovaCRUD\www
    cordova build                                             // Compile to an Android executable
    cordova emulate android                                   // Run default project executable in the Android emulator
    cordova run android                                       // Optional - Deploy the executable to the attached Android device

#### 6.3 Load our mobile application onto an Android device
Our apk (Android package, the executable) is in the platforms\android\ant-build folder. On the Android device go into the settings, Security and enable Unknown sources. This allows installing application directly onto the device (as you do with Windows\OSX). Otherwise you can only install applications from the Google Play store.

Now you need to get the apk onto the Android device. Your options include:


* Copying the file directly to the device when connected via a USB cable
* Copying the file to a web page and accessing it via the browser
* Copy it to your cloud storage folder (I use dropbox) and select it via the devices cloud storage application.

    cd \Users\USER_NAME\Documents\Cordova\CordovaCRUD\platforms\android\ant-build

## Key signing
`cordova build` creates a digitally signed debug version of the apk. For production we will use `cordova build --release` and specify an official digital certificate.

**TODO** How to sign with your own self signed cert for development/testing instead of a Cordova generated cert.


## Other commands
    cordova -v                        // Show version
    npm info cordova                  // Tons of potentially interesting info
    npm update -g cordova             // Update cordova
    cordova platform update android   // Update the android platform for a project

## Plugins
There are many plugins available for Cordova applications that provide access to the mobile devices services. These include contacts, GPS, camera, battery status, motion sensor, compass and many more.

* Console - JS console.log output goes to the native debugger, i.e. Android monitor
* Device - Gives device specific info. We didn’t actually use this?
* Network-Information - Gives network status and prints network status to the debugger

To install the barcode scanner pluging which uses the devices camera, run this command in your projects top level folder.
`cordova plugin add com.phonegap.plugins.barcodescanner`

## Icons/Splash screen
The Cordova documentation has a page on [icons and splash screens](http://cordova.apache.org/docs/en/4.0.0/config_ref_images.md.html). This lists the images sizes for the various platforms you can build for. You can copy your icons and splash screens to a folder in your cordova project and add the necessary entries in the config.xml file. The build process will use the information you put in the config to copy your images and splash screens to the correct platform folders.

Additional resources
* http://developer.android.com/tools/revisions/platforms.html
* http://stackoverflow.com/questions/5583443/what-should-be-the-default-launcher-icon-size
* http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/
* http://www.numediaweb.com/cordova-icons-splash-screens/

## Folders of interest in the Cordova project
### platforms/android/
build.xml
To exclude npm_modules folder if it exists in www folder. Chris had grunt plugins and this excluded it from Cordova.
<property name="aapt.ignore.assets" value="&lt;dir&gt;node_modules:!.svn:!.git:.*:&lt;dir&gt;_*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~" />

### platforms/android/res/drawable
Contains launch screen and splash screen icons

### Application Changes to make an AngularJS web app play nicely with Cordova
* Wait for deviceready prior to running any Cordova code.
* Added ./ in front of all templates in Angular routing.
* Cookie store didn’t work with Cordova.
  * Switched to SessionStorage.
* Defining a variable that’s used in each returned function didn’t work.
* Had to redefine the URL variable in each returned function.
* See Chris’s tutorial/writeup for details.
* Setting network listener is different for Cordova apps
  * Check if window.cordova

Used document instead of window to add event listener

    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);

instead of

    $window.addEventListener("offline", onOffline, false);
    $window.addEventListener("online", onOnline, false);
