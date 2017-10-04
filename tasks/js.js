var config       = require('../lib/manager').getConfig();

var path         = require('path');
var gulp         = require('gulp');
var babel        = require('gulp-babel');
var sourcemaps   = require('gulp-sourcemaps');
var include      = require("gulp-include");
var uglify       = require('gulp-uglify');
var browserSync  = require('browser-sync');

var paths = require('../lib/helpers').getTaskPaths('js');

function dev() {
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(include())
        .pipe(babel(config.js.babel))
        .pipe(sourcemaps.write(config.sourcemaps.dest))
        .pipe(gulp.dest(paths.dest));
}

function prod() {
    return gulp.src(paths.src)
        .pipe(include())
        .pipe(babel(config.js.babel))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest));
}

function watch() {
    gulp.watch(paths.watchSrc, function() {
        return dev().pipe(browserSync.get(config.projectName).stream());
    });
    // Two others methods are kept here in the case the current method fails
    // Method 1
    // gulp.watch(src, ['js:reload']);
    // Method 2
    // gulp.watch(src, ['js:dev']).on('change', browserSync.get(config.projectName).reload);
}

gulp.task('js:dev', dev);
gulp.task('js:prod', prod);
gulp.task('js:watch', watch);
// With method 1
// gulp.task('js:reload', ['js:dev'], function(done) {
//     browserSync.get(config.projectName).reload();
//     done();
// });