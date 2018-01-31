'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var config = require('../config');
var debowerify = require('debowerify');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var handleErrors = require('../util/handleErrors');
var ngAnnotate = require('browserify-ngannotate');
var pump = require('pump');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var envify = require('envify');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {

    var bundler = browserify({
        entries: config.browserify.entries,
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }, watchify.args);

    if (!global.isProd) {
        bundler = watchify(bundler);
        bundler.on('update', function() {
            rebundle();
        });
    }

    var transforms = [
        debowerify,
        ngAnnotate,
        envify,
        'brfs',
        'bulkify',
        'browserify-shim'
    ];

    transforms.forEach(function(transform) {
        bundler.transform(transform);
    });

    bundler.transform(envify, {
        global: true
    });

    function rebundle() {
        var stream = bundler.bundle();
        var createSourcemap = global.isProd && config.browserify.sourcemap;

        gutil.log('Rebundle...');

        return stream.on('error', function() {
            pump([
                source(file),
                gulpif(createSourcemap, buffer()),
                gulpif(createSourcemap, sourcemaps.init()),
                gulpif(global.isProd, streamify(
                    uglify({
                        compress: { drop_console: true }
                    })
                )),
                gulpif(createSourcemap, sourcemaps.write('./')),
                gulp.dest(config.scripts.dest),
                gulpif(browserSync.active, browserSync.reload({ stream: true, once: true }))
                ],
                handleErrors
           )
        })
    }

    return rebundle();
}

gulp.task('browserify', function() {
    return buildScript('main.js');
});
