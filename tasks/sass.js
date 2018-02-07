var config       = require('../lib/manager').getConfig();

var path         = require('path');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var cssnano      = require('cssnano');
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync');

var paths = require('../lib/helpers').getTaskPaths('sass');

function dev() {
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass.options).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(config.css.autoprefixer)
        ]))
        .pipe(sourcemaps.write(config.sourcemaps.dest))
        .pipe(gulp.dest(paths.dest))
}

function prod() {
    return gulp.src(paths.src)
        .pipe(sass(config.sass.options).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(config.css.autoprefixer),
            cssnano(config.css.cssnano)
        ]))
        .pipe(gulp.dest(paths.dest));
}

function watch() {
    const witoutSourceMaps = {match: '**/*.css' };

    gulp.watch(paths.watchSrc, function() {
        // TODO: REMOVE GULP DEST. BROWSERSYNC DOESNT STREAM TO BROWSER WITHOUT IT
        return dev().pipe(browserSync.get(config.projectName).stream(witoutSourceMaps)).pipe(gulp.dest('./web/dist/dump'));
    });
}

gulp.task('sass:dev', dev);
gulp.task('sass:prod', prod);
gulp.task('sass:watch', watch);