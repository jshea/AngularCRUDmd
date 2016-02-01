# Karma test runner
[Karma](https://karma-runner.github.io/) is a test runner for testing JavaScript programs. It can use [Jasmine](http://jasmine.github.io/) to write the actual tests.

## Installing Karma and plugins
The recommended approach is to install Karma (and all the plugins your project needs) locally in the project's directory.
```
# Install Karma:
$ npm install karma --save-dev

# Install plugins that your project needs:
$ npm install karma-jasmine karma-chrome-launcher --save-dev
```

This will install karma, karma-jasmine and karma-chrome-launcher packages into node_modules in your current working directory and also save these as devDependencies in package.json, so that any other developer working on the project will only have to do npm install in order to get all these dependencies installed.
```
# Run Karma:
$ ./node_modules/karma/bin/karma start
```
## Commandline Interface
Typing ./node_modules/karma/bin/karma start sucks and so you might find it useful to install karma-cli globally. You will need to do this if you want to run Karma on Windows from the command line.
```
$ npm install -g karma-cli
```
Then, you can run Karma simply by karma from anywhere and it will always run the local version.