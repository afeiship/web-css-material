/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';
var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var debug = require('gulp-debug');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cssmin = require('gulp-minify-css');
var config = {
  sassOptions: {
    outputStyle: 'expanded' /* nested | expanded | compact | compressed */
  },
  src: './src',
  dist: './dist/css'
};

gulp.task('clean', function () {
  return del(config.dist);
});


gulp.task('fonts',function(){
  return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
});


gulp.task('sass', function () {
  return gulp.src(config.src + '/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(config.sassOptions).on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(config.dist))
    .pipe(cssmin())
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dist));
});


gulp.task('default', ['clean'], function () {
  gulp.start(['sass','fonts']);
});
