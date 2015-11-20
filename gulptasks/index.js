/**
 * Created by s.zhitenev on 22.07.2015.
 *
 */

(function () {
    'use strict';

    // Include gulp
    var gulp = require('gulp');

    // main
    var livereload = require('gulp-livereload');
    var plumber = require('gulp-plumber');
    var rename = require('gulp-rename');
    var preprocess = require('gulp-preprocess');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');

    // css, less
    var csscomb = require('gulp-csscomb');
    var autoprefixer = require('gulp-autoprefixer');
    var minifyCSS = require('gulp-minify-css');
    var less = require('gulp-less');
    var csslint = require('gulp-csslint');

    // js
    var browserify = require('browserify');
    var jshint = require('gulp-jshint');
    var jslint = require('gulp-jslint-simple');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');
    // jade
    var jade = require('gulp-jade');
    // server
    var connect = require('gulp-connect');

    // html
    var jade = require('gulp-jade');
    var htmlmin = require('gulp-htmlmin');
    var htmlhint = require('gulp-htmlhint');
    var ngHtml2Js = require('gulp-ng-html2js');

    var appName = 'index';

    gulp.task('index-min-IMG', function () {

        var pathToImg = [
            'src/' + appName + '/content/**/*.{jpg,gif,png}'
        ];

        return gulp.src(pathToImg)
            .pipe(gulp.dest('dist/' + appName + '/content/'));
    });

    gulp.task('index-min-Fonts', function () {

        var pathToFonts = [
            'src/' + appName + '/content/fonts/*.{otf,eot,ttf,woff,woff2,eof,svg}'
        ];

        return gulp.src(pathToFonts)
            .pipe(gulp.dest('dist/' + appName + '/content/fonts/'));
    });

    gulp.task('index-min-LESS',  function () {

        var pathToLESS = [
            'src/' + appName + '/content/less/imports.less'
        ];

        return gulp.src(pathToLESS)
            .pipe(less())
            .on('error', function (error) {
                console.error('\nError on LESS compilation: \n', error.toString());
                this.emit('end');
            })
            .pipe(autoprefixer({
                browsers: ['last 10 versions'],
                cascade: false
            }))
            .pipe(csslint())
            .pipe(minifyCSS({keepBreaks: false, keepSpecialComments: false}))
            .pipe(rename({basename: 'main', suffix: '.min', extname: '.css'}))
            .pipe(gulp.dest('dist/' + appName + '/content/css/'))
            .pipe(connect.reload());
    });

    gulp.task('index-min-JS', function () {

        var pathToJSApp =
            ['src/' + appName + '/scripts/main.js',
                'src/' + appName + '/scripts/app/templates.min.js'];

        return browserify(pathToJSApp)
            .bundle()
            .on('error', function (err) {
                console.error('Error in Browserify: \n', err.message);
                this.emit('end');
            })
            .pipe(plumber())
            .pipe(source('bundled.js'))
            .pipe(buffer())
            .pipe(preprocess())
            .pipe(uglify())
            .pipe(rename({basename: 'main', suffix: '.min'}))
            .on('error', function (error) {
                console.error('\nError on JS minification: \n', error.toString());
                this.emit('end');
            })
            .pipe(gulp.dest('dist/' + appName + '/scripts/'))
            .pipe(livereload());
    });

    gulp.task('jade', function() {
         var pathToHTMLAll = [
            'src/' + appName + '/scripts/app/views/jade/**/*.jade', !'src/' + appName + '/scripts/app/views/jade/utils/*.jade'
        ];
        // gulp.src(['src/index/scripts/app/views/jade/**/*.jade', 'src/index/scripts/app/views/jade/**/*.jade'])
        return gulp.src(pathToHTMLAll)
        .pipe(jade({
            pretty: true
        }))
            .on('error', console.log)
        .pipe(gulp.dest('src/index/scripts/app/views/'))
        .pipe(connect.reload());
    });

    gulp.task('index-HTML-to-JS', function () {
        var pathToTemplates = [
            'src/' + appName + '/scripts/app/views/*.html'
        ];
        return gulp.src(pathToTemplates)
            .pipe(htmlmin({collapseWhitespace: true}))
            .on('error', function (error) {
                console.error('\nError on HTML minification: \n', error.toString());
                this.emit('end');
            })
            .pipe(ngHtml2Js({
                moduleName: 'app'
            }))
            .pipe(concat('templates.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('src/' + appName + '/scripts/app/'));
    });

    gulp.task('index-jade-to-HTML', function () {

        var pathToJade = 'src/' + appName + '/scripts/app/views/jade/**/*.jade';

        return gulp.src(pathToJade)
            .pipe(plumber())
            .pipe(jade())
            .pipe(gulp.dest('src/' + appName + '/scripts/app/views/'));

    });

    gulp.task('index-min-IndexHTML', function () {

        var pathToIndex = 'src/' + appName + '/*.html';

        return gulp.src(pathToIndex)
            .pipe(plumber())
            .pipe(gulp.dest('dist/'));

    });

    gulp.task('http-server', function() {
        connect.server(
        {
            root: 'dist',
            livereload: true
        });
    });

    gulp.task('index-min-All', ['index-min-IndexHTML', 'index-min-LESS', 'index-min-JS', 'index-min-IMG', 'index-min-Fonts', 'http-server']);

    // Watchers
    gulp.task('index-watch-min', ['index-min-All'], function () {
        livereload.listen(1452);
        gulp.watch('src/**/*.{css,less}', ['index-min-LESS']);
        // gulp.watch('src/**/*.jade', ['jade']);
        gulp.watch('src/**/*.js', ['index-min-JS']);
        // gulp.watch('src/**/*.html', ['index-HTML-to-JS']);
        gulp.watch('src/**/*.html', ['index-HTML-to-JS']);
        gulp.watch('src/index/content/fonts/*.{otf,eot,ttf,woff,woff2,eof,svg}', ['index-min-Fonts']);
        gulp.watch('src/index/content/**/*.{jpg,gif,png}', ['index-min-IMG'])
        livereload.reload(['landing.html'])
        gulp.watch('src/**/*.html', ['index-HTML-to-JS']);
        gulp.watch('src/**/*.jade', ['index-jade-to-HTML']);
    });
}());