var config  = require('../lib/manager').getConfig();

var gulp    = require('gulp');
var changed = require('gulp-changed');
var path    = require('path');
var browserSync  = require('browser-sync');

var paths = require('../lib/helpers').getTaskPaths('static');

function all() {
    return gulp.src(paths.src)
        .pipe(changed(paths.dest))
        .pipe(gulp.dest(paths.dest));
}

function watch() {
    gulp.watch(paths.watchSrc, ['static:dev']).on('change', browserSync.get(config.projectName).reload);
}

gulp.task('static:dev', all);
gulp.task('static:prod', all);
gulp.task('static:watch', watch);

exports.getDest = function() {
    return paths.dest;
};