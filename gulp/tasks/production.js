'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('production', function (cb) {

    global.isProd = true;

    runSequence(
        'build',
        'browserify',
        'analytics',
        's3Paths',
        'gzip',
        cb);

});
