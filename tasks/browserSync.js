if(global.production) return

var browserSync       = require('browser-sync')
var gulp              = require('gulp')
var config            = require('../config')

var browserSyncTask = function() {
  var proxyConfig = config.tasks.browserSync.proxy || null;

  if (typeof(proxyConfig) === 'string') {
    config.tasks.browserSync.proxy = {
      target : proxyConfig
    }
  }

  browserSync.init(config.tasks.browserSync)
}

gulp.task('browserSync', browserSyncTask)
module.exports = browserSyncTask
