/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var debug = require('gulp-debug');
var sourcemaps = require('gulp-sourcemaps');
var config = {
  sassOptions: {
    outputStyle: 'expanded' /* nested | expanded | compact | compressed */
  },
  src: './src',
  dist: './dist'
};


gulp.task('clean', function () {
  return del(config.dist);
});

gulp.task('sass', function () {
  return gulp.src(config.src + '/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(config.sassOptions).on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dist));
});

gulp.task('default', ['clean'], function () {
  gulp.start(['sass']);
});
