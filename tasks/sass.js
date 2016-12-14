var config       = require('../config')
if(!config.tasks.sass) return

var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var browserSync  = require('browser-sync')
var sass         = require('gulp-sass')
var sourcemaps   = require('gulp-sourcemaps')
var handleErrors = require('../lib/handleErrors')
var autoprefixer = require('gulp-autoprefixer')
var path         = require('path')
var cssnano      = require('gulp-cssnano')

var paths = {
  src: path.join(config.root.src, config.tasks.sass.src, '/**/*.{' + config.tasks.sass.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.sass.dest)
}

var sassTask = function () {
  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass(config.tasks.sass.options))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.sass.autoprefixer))
    .pipe(gulpif(global.production, cssnano({autoprefixer: false})))
    .pipe(gulpif(!global.production, sourcemaps.write(config.sourcemaps.dest)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('sass', sassTask)
module.exports = sassTask
