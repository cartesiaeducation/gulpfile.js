var config       = require('../lib/manager').getConfig();

var path         = require('path');
var gulp         = require('gulp');
var babel        = require('gulp-babel');
var sourcemaps   = require('gulp-sourcemaps');
var include      = require("gulp-include");
var uglify       = require('gulp-uglify');
var browserSync  = require('browser-sync');

var extensionsGlob = '/**/*.' + config.js.extensions;

var src = config.js.altSrc.map(function(altPath) {
    return path.join(altPath, extensionsGlob);
});

src.push(path.join(config.root.src, config.js.src, extensionsGlob));

var dest = path.join(config.root.dest, config.js.dest);

function dev() {
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(babel(config.js.babel))
        .pipe(include())
        .pipe(sourcemaps.write(config.sourcemaps.dest))
        .pipe(gulp.dest(dest));
}

function prod() {
    return gulp.src(src)
        .pipe(babel(config.js.babel))
        .pipe(include())
        .pipe(uglify())
        .pipe(gulp.dest(dest));
}

function watch() {
    gulp.watch(src, function() {
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

exports.getSrc = function() {
    return src;
};