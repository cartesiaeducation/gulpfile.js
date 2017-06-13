var config      = require('../lib/manager').getConfig();

var gulp        = require('gulp');
var changed     = require('gulp-changed');
var imagemin    = require('gulp-imagemin');
var path        = require('path');
var browserSync = require('browser-sync');

var extensionsGlob = '/**/*.{' + config.images.extensions + '}';

var src = config.images.altSrc.map(function(altPath) {
    return path.join(altPath, extensionsGlob);
});

src.push(path.join(config.root.src, config.images.src, extensionsGlob));

var dest = path.join(config.root.dest, config.images.dest);

function all() {
    return gulp.src(src)
        .pipe(changed(dest))
        .pipe(imagemin())
        .pipe(gulp.dest(dest));
}

function watch() {
    gulp.watch(src, ['images:dev']).on('change', browserSync.get(config.projectName).reload);
}

gulp.task('images:dev', all);
gulp.task('images:prod', all);
gulp.task('images:watch', watch);

exports.getSrc = function() {
    return src;
};