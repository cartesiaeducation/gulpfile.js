var gulp   = require('gulp')
var del    = require('del')
var config = require('../config')
var path   = require('path');
var compact = require('lodash/compact');
var getEnabledTasks = require('../lib/getEnabledTasks')

var cleanTask = function (cb) {
  var tasks = getEnabledTasks();
  var revManifest = path.join(config.root.dest, config.rev.manifestDest, 'rev-manifest.json');

  // Merge tasks.asset and tasks.code into one array
  tasks = [].concat(tasks.assetTasks, tasks.codeTasks);

  var thingsToDel = [].concat(tasksDest(tasks), revManifest);

  // Create new array with tasks dest
  function tasksDest(tasks) {
    return compact(tasks.map(getDest));
  }

  // Return task dest
  function getDest(task) {
    var taskDest = config.tasks[task].dest;

    if (taskDest) {
      return path.join(config.root.dest, taskDest);
    }

    return false;
  }

  del(thingsToDel).then(function () {
    cb()
  })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask

