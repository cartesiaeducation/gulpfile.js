var manager      = require('../lib/manager');
var config       = manager.getConfig();
var projectRoot  = manager.getProjectRoot();

var gulp        = require('gulp');
var rev         = require('gulp-rev');
var path        = require('path');
var revNapkin   = require('gulp-rev-napkin');

var src     = path.join(config.root.dest, '/**/*');
var base    = config.rev.base;

// Some static files should not be reved
var excludeStatic = "!" + require('./static').getDest() + '/**/*';

gulp.task('rev', function() {
    return gulp.src([src, excludeStatic], {base: base})
        .pipe(rev())
        .pipe(gulp.dest(base))
        .pipe(revNapkin({verbose: false})) // Remove unreved files
        .pipe(rev.manifest(config.rev.manifest))
        .pipe(gulp.dest(path.join(projectRoot, config.rev.manifest.dest)));
});

// File output explanation
//
// Gulp looks for all not excluded file inside the dest directory
// By default gulps does not "remember" paths before the glob (/**/*). Gulp's base option defaults to those paths.
// This means it keeps in memory, for instance, css/main.css but not dist/css/main.css
// Rev uses those gulps paths to fill the rev-manifest.json
// In order to make Symfony Asset Strategy work we need to make Gulp keep the "dist/" part of dist/css/main.css
// We can do so by specifying the base. Everything between the base and the glob will be kept in the paths
// But then if we try to output reved files in place (inside dist/) it outputs dist/ + paths, here dist/dist/css/main.css
// To fix this problem we output the files inside the base directory