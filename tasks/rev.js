var manager     = require('../lib/manager');
var config      = manager.getConfig();

var gulp        = require('gulp');
var rev         = require('gulp-rev');
var path        = require('path');
var revNapkin   = require('gulp-rev-napkin');

var src     = path.join(config.root.dest, '/**/*');
var dest    = path.join(config.root.dest);

// Some static files should not be reved
var excludeStatic = "!" + require('./static').getDest() + '/**/*';

gulp.task('rev', function() {
    return gulp.src([src, excludeStatic])
        .pipe(rev())
        .pipe(gulp.dest(dest))
        .pipe(revNapkin({verbose: false})) // Remove unreved files
        .pipe(rev.manifest(config.rev.manifest))
        .pipe(gulp.dest(config.rev.manifest.dest));
});