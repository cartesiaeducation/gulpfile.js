var config = require('../config');
var gulp   = require('gulp');
var path   = require('path');
var watch  = require('gulp-watch');
var gulpSequence = require('gulp-sequence');

var watchTask = function() {
  var watchableTasks = ['fonts', 'iconFont', 'images', 'svgSprite', 'html', 'js', 'sass', 'less'];

  watchableTasks.forEach(function(taskName) {
    var task = config.tasks[taskName];
    if(task) {
      var glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');
      watch(glob, function() {
       require('./' + taskName)()
      })
    }
  });

  // TODO: Clean this
  var includePaths = config.tasks.sass.options.includePaths[0];
  var extensions = config.tasks.sass.extensions.join(',');

  watch(path.join(includePaths, 'cartesiacore/scss', '**/*.{' + extensions +'}'), function() {
      require('./sass')();
  });
};

gulp.task('watch', ['browserSync'], watchTask);
module.exports = watchTask;
