var manager      = require('../lib/manager');
var config       = manager.getConfig();
var projectRoot  = manager.getProjectRoot();

var gulp    = require('gulp');
var del     = require('del');
var path    = require('path');

gulp.task('clean', function() {
    return del([
        path.join(projectRoot, config.root.dest),
        // Deleting rev-manifest.json in dev mode prevents {{ asset('file') }} from looking for reved files
        path.join(projectRoot, config.rev.manifest.dest, config.rev.manifest.name)
    ], {force: true});
});