'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', function(callback) {

  callback = callback || function() {};

  global.isProd = false;

  runSequence('build', 'browserify', 'watch', callback);

});
