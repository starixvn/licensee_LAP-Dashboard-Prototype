/*!
 * Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var clean = require('gulp-rimraf');
var path = require('path');
var merge = require('merge-stream');
var runSequence = require('gulp4-run-sequence');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var argv = require('minimist')(process.argv.slice(2));
var concat = require('gulp-concat');
const FwdRef = require('undertaker-forward-reference');

// Settings
var DEST = './build'; // The build output folder
var RELEASE = !!argv.release; // Minimize and optimize during a build?
var svnPath = argv.svn;
var AUTOPREFIXER_BROWSERS = [ // https://github.com/ai/autoprefixer
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

var src = {};
var watch = false;
var pkgs = (function () {
    var temp = {};
    var map = function (source) {
        for (var key in source) {
            temp[key.replace(/[^a-z0-9]/gi, '')] = source[key].substring(1);
        }
    };
    map(require('./package.json').dependencies);
    return temp;
}());

gulp.registry(FwdRef());

// The default task
gulp.task('default', gulp.series('serveAndDeployToLocal'));

// Clean up
gulp.task('clean', function () {
    return gulp.src(DEST + '/styles', { read: false })
        .pipe(clean());
});
// 3rd party libraries
gulp.task('vendor', function () {
    return merge(
        gulp.src('./node_modules/jquery/dist/**')
        .pipe(gulp.dest(DEST + '/vendor/jquery-' + pkgs.jquery)),
        gulp.src('./node_modules/bootstrap/dist/fonts/**')
        .pipe(gulp.dest(DEST + 'styles/pages/summary/fonts'))
    );
});

// Static files
gulp.task('assets', function () {
    src.assets = 'src/styles/assets/**';
    return gulp.src(src.assets)
        .pipe($.changed(DEST))
        .pipe(gulp.dest(DEST + '/styles/assets'))
        .pipe($.size({ title: 'assets' }));
});

// Images
gulp.task('images', function () {
    src.images = 'src/styles/images/**';
    return gulp.src(src.images)
        .pipe($.changed(DEST + 'styles/images'))
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(DEST + '/styles/images'))
        .pipe($.size({ title: 'images' }));
});

// HTML pages
gulp.task('pages', function () {
    src.pages = 'src/**/*.html';
    return gulp.src(src.pages)
        .pipe($.changed(DEST))
        .pipe($.if(RELEASE, $.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true
        })))
        .pipe(gulp.dest(DEST))
        .pipe($.size({ title: 'pages' }));
});

// CSS style sheets
gulp.task('styles', function () {
    src.styles = 'src/styles/**/*.{css,scss}';

    var sourcemaps = require('gulp-sourcemaps');
    var cssStream = gulp.src(['node_modules/react-resizable/css/styles.css', 'node_modules/react-grid-layout/css/styles.css'])
        .pipe(concat("vendor.css"));

    var sassStream = gulp.src('src/styles/pages/summary/dashboard.scss')
        .pipe(sourcemaps.init())
        .pipe($.plumber())
        .pipe($.sass())
        .on('error', console.error.bind(console));
    return merge(sassStream, cssStream)
        .pipe(concat("dashboard.css"))
        .pipe($.autoprefixer({ overrideBrowserslist: AUTOPREFIXER_BROWSERS }))
        .pipe($.csscomb())
        .pipe($.if(RELEASE, $.minifyCss()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST + '/styles/pages/summary'))
        .pipe($.size({ title: 'styles' }));
});

gulp.task('fonts', function () {
    src.fonts = 'src/styles/fonts/**';
    return gulp.src(src.fonts)
        .pipe($.changed(DEST + '/styles/fonts'))
        .pipe(gulp.dest(DEST + '/styles/fonts'))
        .pipe($.size({
            title: 'fonts'
        }));
});

// Bundle
gulp.task('bundle', function (cb) {
    var started = false;
    var config = require('./config/webpack.config.js')(RELEASE);
    var bundler = webpack(config);

    function bundle(err, stats) {
        if (err) {
            throw new $.util.PluginError('webpack', err);
        }

        !!argv.verbose && $.util.log('[webpack]', stats.toString({ colors: true }));

        if (!started) {
            started = true;
            return cb();
        }
    }

    if (watch) {
        bundler.watch(200, bundle);
    } else {
        bundler.run(bundle);
    }
});

// Build the app from source code
gulp.task('build', function (cb) {
    runSequence('clean', ['vendor', 'assets', 'images', 'pages', 'styles', 'fonts', 'bundle'], cb);
});

// Launch a lightweight HTTP Server
gulp.task('serve', function (cb) {
    watch = true;

    runSequence('build', ['copytoLocal'], function () {
        browserSync({
            notify: false,
            // Customize the BrowserSync console logging prefix
            logPrefix: 'RSK',
            // Run as an https by uncommenting 'https: true'
            // Note: this uses an unsigned certificate which on first access
            //       will present a certificate warning in the browser.
            // https: true,
            server: DEST
        });

        gulp.watch(src.assets, gulp.series('assets'));
        gulp.watch(src.images, gulp.series('images'));
        gulp.watch(src.pages, gulp.series('pages'));
        gulp.watch(src.styles, gulp.series('styles'));
        gulp.watch(src.fonts, gulp.series('fonts'));
        gulp.watch(['src/**/*.jsx', 'src/**/*.js', '!src/**/*.test.js'], function (done) {
            browserSync.reload();
            done();
        });
        gulp.watch('build/js/pages/summary/**', function (done) {
            gulp.src('build/js/pages/summary/**')
                    .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/js/pages/dashboard'))
                    .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/js/pages/dashboard'));
            done();
        });
        gulp.watch('build/vendors/initialChunk/**', function (done) {
            gulp.src('build/vendors/initialChunk/**')
                    .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/vendors/initialChunk'))
                    .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/vendors/initialChunk'));
            done();
        });
        gulp.watch('build/styles/pages/summary/**', function (done) {
            gulp.src('build/styles/pages/summary/**')
                    .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/css/pages/dashboard/main'))
                    .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/dashboard/main'));
            done();
        });
        gulp.watch('build/styles/fonts/**', function (done) {
            gulp.src('build/styles/fonts/**')
                    .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/css/pages/dashboard/fonts'))
                    .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/dashboard/fonts'));
            done();
        });
        cb();
    });
});

gulp.task('serveAndDeployToLocal', function (cb) {
    watch = true;

    runSequence('build', ['copytoLocal'], function () {
        browserSync({
            notify: false,
            // Customize the BrowserSync console logging prefix
            logPrefix: 'RSK',
            // Run as an https by uncommenting 'https: true'
            // Note: this uses an unsigned certificate which on first access
            //       will present a certificate warning in the browser.
            // https: true,
            server: DEST
        });

        gulp.watch(src.assets, gulp.series('assets'));
        gulp.watch(src.images, gulp.series('images'));
        gulp.watch(src.pages, gulp.series('pages'));
        gulp.watch(src.styles, gulp.series('styles'));
        gulp.watch(src.fonts, gulp.series('fonts'));
        gulp.watch(['src/**/*.jsx', 'src/**/*.js', '!src/**/*.test.js'], function (done) {
            browserSync.reload();
            done();
        });
        gulp.watch('build/js/pages/summary/**', function (done) {
            gulp.src('build/js/pages/summary/**')
                    .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/js/pages/dashboard'))
                    .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/js/pages/dashboard'));
            done();
        });
        gulp.watch('build/vendors/initialChunk/**', function (done) {
            gulp.src('build/vendors/initialChunk/**')
                    .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/vendors/initialChunk'))
                    .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/vendors/initialChunk'));
            done();
        });
        gulp.watch('build/styles/pages/summary/**', function (done) {
            gulp.src('build/styles/pages/summary/**')
                    .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/css/pages/dashboard/main'))
                    .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/dashboard/main'));
            done();
        });
        gulp.watch('build/styles/fonts/**', function (done) {
            gulp.src('build/styles/fonts/**')
                    .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/css/pages/dashboard/fonts'))
                    .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/dashboard/fonts'));
            done();
        });
        cb();
    });
});

gulp.task('copytoLocal', function (cb) {
    gulp.src('build/styles/fonts/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/css/pages/dashboard/fonts'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/dashboard/fonts'));
    gulp.src('build/styles/pages/summary/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/css/pages/dashboard/main'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/dashboard/main'));
    gulp.src('build/vendors/initialChunk/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/vendors/initialChunk'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/vendors/initialChunk'));

    return gulp.src('build/js/pages/summary/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/js/pages/dashboard'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/js/pages/dashboard'));
});

// Deploy to GitHub Pages
gulp.task('copytoSVN', function (cb) {
    // Remove temp folder

    src.fonts = 'build/styles/fonts/**';
    gulp.src(src.fonts)

    .pipe(gulp.dest(svnPath + '/css/pages/dashboard/fonts'))
        .pipe($.size({
            title: 'fonts'
        }));

    src.css = 'build/styles/pages/summary/**';
    gulp.src(src.css)

    .pipe(gulp.dest(svnPath + '/css/pages/dashboard/main'))
        .pipe($.size({
            title: 'css'
        }));

    src.js = 'build/js/pages/summary/**';
    return gulp.src(src.js)

    .pipe(gulp.dest(svnPath + '/js/pages/dashboard'))
        .pipe($.size({
            title: 'js'
        }));
});

gulp.task("deploy", gulp.series('build', 'copytoSVN'));

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
var url = 'http://www.google.com';
// Please feel free to use the `nokey` option to try out PageSpeed
// Insights as part of your build process. For more frequent use,
// you should register for your own API key. For more info:
// https://developers.google.com/speed/docs/insights/v2/getting-started

gulp.task('pagespeed-mobile', function () {
    return pagespeed(url, {
        // key: key
        nokey: 'true',
        strategy: 'mobile',
    }).then(function (data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
        console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
    });
});

gulp.task('pagespeed-desktop', function () {
    return pagespeed(url, {
        nokey: 'true',
        // key: key,
        strategy: 'desktop',
    }).then(function (data) {
        console.log('Speed score: ' + data.ruleGroups.SPEED.score);
    });
});