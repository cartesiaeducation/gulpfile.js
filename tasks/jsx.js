var config       = require('../lib/manager').getConfig();

var gulp         = require('gulp');
var webpack      = require('webpack-stream');
var webpack2     = require('webpack'); // Force Webpack 2 usage
var browserSync  = require('browser-sync');

var paths = require('../lib/helpers').getTaskPaths('jsx');

function dev() {
    return gulp.src(paths.src)
        .pipe(webpack(require('../webpack.dev.js'), webpack2))
        .pipe(gulp.dest(paths.dest));
}

function prod() {
    return gulp.src(paths.src)
        .pipe(webpack(require('../webpack.prod.js'), webpack2))
        .pipe(gulp.dest(paths.dest));
}

function watch() {
    gulp.watch(paths.watchSrc, function() {
        return dev().pipe(browserSync.get(config.projectName).stream());
    });
}

gulp.task('webpack:dev', dev);
gulp.task('webpack:prod', prod);
gulp.task('webpack:watch', watch);