var config       = require('../lib/manager').getConfig();

var path         = require('path');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var cssnano      = require('cssnano');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync');

var extensionsGlob = '/**/*.{' + config.sass.extensions + '}';

var src = config.sass.altSrc.map(function(altPath) {
    return path.join(altPath, extensionsGlob);
});

src.push(path.join(config.root.src, config.sass.src, extensionsGlob));

var dest = path.join(config.root.dest, config.sass.dest);

function dev() {
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass.options).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(config.css.autoprefixer)
        ]))
        .pipe(sourcemaps.write(config.sourcemaps.dest))
        .pipe(gulp.dest(dest))
}

function prod() {
    return gulp.src(src)
        .pipe(sass(config.sass.options).on('error', sass.logError))
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

gulp.task('sass:dev', dev);
gulp.task('sass:prod', prod);
gulp.task('sass:watch', watch);

exports.getSrc = function() {
    return src;
};