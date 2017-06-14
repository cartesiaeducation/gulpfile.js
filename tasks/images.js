var config      = require('../lib/manager').getConfig();

var gulp        = require('gulp');
var changed     = require('gulp-changed');
var imagemin    = require('gulp-imagemin');
var path        = require('path');
var browserSync = require('browser-sync');

var paths = require('../lib/helpers').getTaskPaths('images');

function all() {
    return gulp.src(paths.src)
        .pipe(changed(paths.dest))
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dest));
}

function watch() {
    gulp.watch(paths.watchSrc, ['images:dev']).on('change', browserSync.get(config.projectName).reload);
}

gulp.task('images:dev', all);
gulp.task('images:prod', all);
gulp.task('images:watch', watch);