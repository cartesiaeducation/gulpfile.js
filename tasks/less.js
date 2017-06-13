var config       = require('../lib/manager').getConfig();

var path         = require('path');
var gulp         = require('gulp');
var less         = require('gulp-less');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var cssnano      = require('cssnano');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync');

var src = path.join(config.root.src, config.less.src, '/**/*.{' + config.less.extensions + '}');
var dest = path.join(config.root.dest, config.less.dest);

function dev() {
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(less(config.less.options))
        .pipe(postcss([
            autoprefixer(config.css.autoprefixer)
        ]))
        .pipe(sourcemaps.write(config.sourcemaps.dest))
        .pipe(gulp.dest(dest));
}

function prod() {
    return gulp.src(src)
        .pipe(less(config.less.options))
        .pipe(postcss([
            autoprefixer(config.css.autoprefixer),
            cssnano(config.css.cssnano)
        ]))
        .pipe(gulp.dest(dest));
}

function watch() {
    gulp.watch(src, function() {
        return dev().pipe(browserSync.get(config.projectName).stream());
    });
}

gulp.task('less:dev', dev);
gulp.task('less:prod', prod);
gulp.task('less:watch', watch);

exports.getSrc = function() {
    return src;
};