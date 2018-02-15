const config       = require('../lib/manager').getConfig();

const gulp         = require('gulp');
const sass         = require('gulp-sass');
const postcss      = require('gulp-postcss');
const sourcemaps   = require('gulp-sourcemaps');
const cssnano      = require('cssnano');
const autoprefixer = require('autoprefixer');
const browserSync  = require('browser-sync');

const paths = require('../lib/helpers').getTaskPaths('sass');

function dev() {
    return gulp.src(paths.devSrc)
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