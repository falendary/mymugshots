(function () {

    'use strict';
    var gulp = require('gulp');

    var requireDir = require('require-dir');
    var dir = requireDir('./gulptasks');

    gulp.task('release', ['index-min-All']);

    gulp.task('default', ['release']);

}()); 