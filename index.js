var manager         = require('./lib/manager');

var gulp            = require('gulp');
var gulpSequence    = require('gulp-sequence');

require('./tasks/clean');
require('./tasks/sass');
require('./tasks/js');
require('./tasks/static');
require('./tasks/images');
require('./tasks/watch');
require('./tasks/rev');

gulp.task('build', function(done) {
    gulpSequence('clean', manager.getActiveTasks('dev'), done);
});

gulp.task('dev', function(done) {
    gulpSequence('build', 'watch', done);
});

gulp.task('prod', function(done) {
    gulpSequence('clean', manager.getActiveTasks('prod'), 'rev', done);
});