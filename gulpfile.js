// Dependency declaration
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    sourcemaps = require('gulp-sourcemaps'),
    pump = require('pump'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    jsonmin = require('gulp-json-minify'),
    babelify = require('babelify'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass');

// Js source files
var jsSources = [
  'components/scripts/main.js',
  'components/scripts/sort.js'
];

// --------------------- Development tasks

// Js linter
gulp.task('linter', function(){
  return gulp.src(jsSources)
    .pipe(eslint({
        rules: {
            'semi': ['error', 'always'],
            'quotes': ['error', 'double'],
            'space-before-function-paren': 'off',
            'no-unused-vars': 'off'
        },
        parserOptions: {
            'ecmaVersion': 6
        },
        globals: [
            'jQuery',
            '$'
        ],
        envs: [
            'browser'
        ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Browserify and watchify task
gulp.task('watchJs', function() {
  var b = browserify({
    entries: ['components/scripts/main.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  }).transform('babelify', {presets: ['env']});

  b.on('update', rebundle);

  function rebundle() {
    return b.bundle()
      .pipe(source('script.js'))
      .pipe(gulp.dest('builds/development/js'))
      .pipe(connect.reload());
  }
  return rebundle();
});

// Scss task
gulp.task('sass', function () {
  return gulp.src('components/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('builds/development/css'))
    .pipe(connect.reload());
});

// Local server
gulp.task('connect', function() {
  connect.server({
    root: 'builds/development/',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('builds/development/*.html')
    .pipe(connect.reload());
});

// --------------------- Production build tasks

// Minify js
gulp.task('minifyJs', function () {
  pump([
    gulp.src('builds/development/js/script.js'),
    uglify(),
    gulp.dest('builds/production/js')
  ]);
});

// Minify css
gulp.task('minifyCss', function () {
  return gulp.src('builds/development/css/*.css')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('builds/production/css'))
});

// Minify html
gulp.task('minifyHtml', function() {
  return gulp.src('builds/development/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('builds/production/'));
});

// Minify json
gulp.task('minifyJson', function() {
  return gulp.src('builds/development/js/*.json')
    .pipe(jsonmin())
    .pipe(gulp.dest('builds/production/js/'))
    .on('error', gutil.log);
});

// Move images to production
gulp.task('copyImg', function() {
  gulp.src('builds/development/images/**/*.{jpg,png,gif,svg}')
  .pipe(gulp.dest('builds/production/images/'));
});

// Bulk minify task for production build
gulp.task('minify', ['minifyHtml', 'minifyJs', 'minifyCss', 'minifyJson', 'copyImg']);

// --------------------- Watch tasks

gulp.task('watch', function() {
  gulp.watch([jsSources], ['linter']);
  gulp.watch(['builds/development/*.html'], ['html']);
  gulp.watch(['components/scss/*.scss'], ['sass']);
});

// Watch task for js, scss and html reload
gulp.task('default', ['connect', 'watch', 'watchJs']);


