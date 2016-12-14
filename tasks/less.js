var config       = require('../config');
if(!config.tasks.less) return;

var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');
var less         = require('gulp-less');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var path         = require('path');
var cssnano      = require('gulp-cssnano');

var paths = {
  src: path.join(config.root.src, config.tasks.less.src, '/*.{' + config.tasks.less.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.less.dest)
};

var lessTask = function () {
  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(less(config.tasks.less.options))
    .pipe(autoprefixer(config.tasks.less.autoprefixer))
    .pipe(gulpif(global.production, cssnano({autoprefixer: false})))
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
};

gulp.task('less', lessTask);
module.exports = lessTask;
