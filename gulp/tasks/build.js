'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(callback) {

  callback = callback || function() {};

  runSequence(['styles', 'images', 'fonts', 'views', 'favicons'], callback);

});
