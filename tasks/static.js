var config  = require('../lib/manager').getConfig();

var gulp    = require('gulp');
var changed = require('gulp-changed');
var path    = require('path');
var browserSync  = require('browser-sync');

var extensionsGlob = '/**/*';

var src = config.static.altSrc.map(function(altPath) {
    return path.join(altPath, extensionsGlob);
});

src.push(path.join(config.root.src, config.static.src, extensionsGlob));

var dest = path.join(config.root.dest, config.static.dest);

function all() {
    return gulp.src(src)
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));
}

function watch() {
    gulp.watch(src, ['static:dev']).on('change', browserSync.get(config.projectName).reload);
}

gulp.task('static:dev', all);
gulp.task('static:prod', all);
gulp.task('static:watch', watch);

exports.getSrc = function() {
    return src;
};

exports.getDest = function() {
    return dest;
};