/**
 * Created by Bender on 01.06.2015.
 */

var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var sourcemaps  = require('gulp-sourcemaps');
var buffer      = require('vinyl-buffer');
var size        = require('gulp-size');


gulp.task('app-debug',function (){
    return browserify({
            entries: './src/app.js',
            debug: true
        })
        .bundle()
        .on('error',function(error){
            console.log(error);
        })
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(rename({suffix: '.min'}))
        .pipe(size({showFiles:true}))
        .pipe(gulp.dest('./js/'));
});

gulp.task('app-prodaction',function (){
    return browserify({
        entries: './src/app.js',
        debug: true
    })
        .bundle()
        .on('error',function(error){
            console.log(error);
        })
        .pipe(source('main.js'))
        .pipe(buffer(true))
        .pipe(uglify({
            mangle: true,
            compress: {
                sequences: true,
                properties: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_debugger: true,
                drop_console: true
            }
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(size({showFiles:true}))
        .pipe(gulp.dest('./js/'))
});