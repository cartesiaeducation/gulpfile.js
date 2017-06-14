var config       = require('../lib/manager').getConfig();

var path         = require('path');
var gulp         = require('gulp');
var less         = require('gulp-less');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var cssnano      = require('cssnano');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync');

var paths = require('../lib/helpers').getTaskPaths('less');

function dev() {
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(less(config.less.options))
        .pipe(postcss([
            autoprefixer(config.css.autoprefixer)
        ]))
        .pipe(sourcemaps.write(config.sourcemaps.dest))
        .pipe(gulp.dest(paths.dest));
}

function prod() {
    return gulp.src(paths.src)
        .pipe(less(config.less.options))
        .pipe(postcss([
            autoprefixer(config.css.autoprefixer),
            cssnano(config.css.cssnano)
        ]))
        .pipe(gulp.dest(paths.dest));
}

function watch() {
    gulp.watch(paths.watchSrc, function() {
        return dev().pipe(browserSync.get(config.projectName).stream());
    });
}

gulp.task('less:dev', dev);
gulp.task('less:prod', prod);
gulp.task('less:watch', watch);