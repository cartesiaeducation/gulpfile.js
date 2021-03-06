var manager      = require('../lib/manager');
var config       = manager.getConfig();
var projectRoot  = manager.getProjectRoot();

var gulp         = require('gulp');
var webpack      = require('webpack-stream');
var webpack2     = require('webpack'); // Force Webpack 2 usage
var browserSync  = require('browser-sync');
var path         = require('path');

var paths = require('../lib/helpers').getTaskPaths('jsx');

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
}

gulp.task('jsx:dev', dev);
gulp.task('jsx:prod', prod);
gulp.task('jsx:watch', watch);

// TODO: Create high level config in lib/manager
function webpackConfig(env) {
    var entry = config.jsx.entry;

    return Object.assign(require(`../webpack.${env}.js`), {
        entry: typeof entry === 'string'
            ? path.resolve(projectRoot, config.root.src, config.jsx.src, entry)
            : Object.keys(entry).reduce(function(previous, current) {
                previous[current] = path.resolve(projectRoot, config.root.src, config.jsx.src, entry[current]);
                return previous;
            }, {})
    });
}