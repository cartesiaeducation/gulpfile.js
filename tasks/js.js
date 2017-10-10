var config       = require('../lib/manager').getConfig();

var gulp         = require('gulp');
var webpack      = require('webpack-stream');
var webpack2     = require('webpack'); // Force Webpack 2 usage
var browserSync  = require('browser-sync');
var path         = require('path');

var paths = require('../lib/helpers').getTaskPaths('js');

function dev() {
    return gulp.src(paths.src)
        .pipe(webpack(webpackConfig('dev'), webpack2))
        .pipe(gulp.dest(paths.dest));
}

function prod() {
    return gulp.src(paths.src)
        .pipe(webpack(webpackConfig('prod'), webpack2))
        .pipe(gulp.dest(paths.dest));
}

function watch() {
    gulp.watch(paths.watchSrc, function() {
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

// TODO: Create high level config in lib/manager
function webpackConfig(env) {
    var entry = config.js.entry;

    return Object.assign(require(`../webpack.${env}.js`), {
        entry: typeof entry === 'string'
            ? path.resolve(config.root.src, config.js.src, entry)
            : Object.keys(entry).reduce(function(previous, current) {
                previous[current] = path.resolve(projectRoot, config.root.src, config.js.src, entry[current]);
                return previous;
            }, {})
    });
}