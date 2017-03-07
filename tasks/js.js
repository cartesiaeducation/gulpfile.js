var config       = require('../config');
if(!config.tasks.js) return;

var gulp          = require('gulp');
var gulpif        = require('gulp-if');
var browserSync   = require('browser-sync');
var babel         = require('gulp-babel');
var lint          = require('gulp-eslint');
var sourcemaps    = require('gulp-sourcemaps');
var path          = require('path');
var include       = require("gulp-include");
var uglify        = require('gulp-uglify');

var paths = {
  src: path.join(config.root.src, config.tasks.js.src, '/**/*.js'),
  dest: path.join(config.root.dest, config.tasks.js.dest)
};

var jsTask = function () {
  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    //.pipe(babel(config.tasks.js.babel))
    .pipe(lint(config.tasks.js.lint))
    .pipe(lint.format())
    // .pipe(concat(config.tasks.js.concat))
    .pipe(include())
    .pipe(gulpif(global.production, uglify()))
    .pipe(gulpif(!global.production, sourcemaps.write(config.sourcemaps.dest)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
};

gulp.task('js', jsTask);
module.exports = jsTask;
