var manager              = require('../lib/manager');
var config               = manager.getConfig();
var watchableTasks       = manager.getActiveTasks('watch');

var gulp        = require('gulp');
var browserSync = require('browser-sync').create(config.projectName);

gulp.task('watch', watchableTasks, function() {
    browserSync.init(config.browserSync.options);
});
