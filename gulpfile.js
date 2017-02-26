'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function () {
    return gulp.src('frontend/styles/styles.styl', {base: 'frontend'})
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(stylus())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('public'));
});

gulp.task('clean', function () {
    return del('public');
});

gulp.task('index-html', function () {
    return gulp.src('frontend/index.html')
        .pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('index-html', 'styles')));