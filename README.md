# Front-end starter template
A simple front-end starter template built with gulp, browserify (+ watchify) and babelify. Runs its own webserver through gulp-connect (with live reload).

## Requirements
* Node
* npm

## Start a new project with this template
From terminal, run:
```
npm install
```
To start the watch process and run your local server, run:
```
gulp
```
This command does the following:
* Starts a local server at http://localhost:8080/
* Starts the watch process for eslint
* Watches for changes in the .html files in the builds/development directory
* Watches for changes in the components/scss directory
* Initiates the browserify/watchify task

Be sure to adjust the *jsSources* variable in the gulp file before running _gulp_.

## Project structure
* builds
  * development
    * css (built files)
    * images (source images)
    * js (built files)
    * index.html (source html)
  * production
* components
  * scripts (source js)
  * scss (source scss)
* .babelrc
* gulpfile.js
* package.json

## To build files for production
From terminal, run this command:
```
gulp minify
```
This will package the js, css, html and img folder, optimize the assets and move them to the build/production directory.

## To do
- [ ] Get gulp-sourcemaps working
