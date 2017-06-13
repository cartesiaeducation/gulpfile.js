var config  = require('../lib/manager').getConfig();

var gulp    = require('gulp');
var del     = require('del');
var path    = require('path');

gulp.task('clean', function() {
    return del([
        config.root.dest,
        // Deleting rev-manifest.json in dev mode prevents {{ asset('file') }} from looking for reved files
        path.join(config.rev.manifest.dest, config.rev.manifest.name)
    ]);
});