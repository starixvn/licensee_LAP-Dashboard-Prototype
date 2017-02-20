/*!
 * Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var argv = require('minimist')(process.argv.slice(2));
var concat = require('gulp-concat');

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
var pkgs = (function() {
    var temp = {};
    var map = function(source) {
        for (var key in source) {
            temp[key.replace(/[^a-z0-9]/gi, '')] = source[key].substring(1);
        }
    };
    map(require('./package.json').dependencies);
    return temp;
}());

// The default task
gulp.task('default', ['serve']);

// Clean up
gulp.task('clean', del.bind(null, [DEST]));

// 3rd party libraries
gulp.task('vendor', function() {
    return merge(
        gulp.src('./node_modules/jquery/dist/**')
        .pipe(gulp.dest(DEST + '/vendor/jquery-' + pkgs.jquery)),
        gulp.src('./node_modules/bootstrap/dist/fonts/**')
        .pipe(gulp.dest(DEST + '/fonts'))
    );
});

// Static files
gulp.task('assets', function() {
    src.assets = 'src/assets/**';
    return gulp.src(src.assets)
        .pipe($.changed(DEST))
        .pipe(gulp.dest(DEST))
        .pipe($.size({ title: 'assets' }));
});

// Images
gulp.task('images', function() {
    src.images = 'src/images/**';
    return gulp.src(src.images)
        .pipe($.changed(DEST + '/images'))
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(DEST + '/images'))
        .pipe($.size({ title: 'images' }));
});

// HTML pages
gulp.task('pages', function() {
    src.pages = 'src/pages/**/*.html';
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
gulp.task('styles', function() {
    src.styles = 'src/styles/**/*.{css,scss}';

    var sourcemaps = require('gulp-sourcemaps');
    var cssStream = gulp.src(['node_modules/react-resizable/css/styles.css', 'node_modules/react-grid-layout/css/styles.css'])
        .pipe(concat("vendor.css"));

    var sassStream = gulp.src('src/styles/dashboard.scss')
        .pipe(sourcemaps.init())
        .pipe($.plumber())
        .pipe($.sass())
        .on('error', console.error.bind(console));
    return merge(sassStream, cssStream)
        .pipe(concat("dashboard.css"))
        .pipe($.autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
        .pipe($.csscomb())
        .pipe($.if(RELEASE, $.minifyCss()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DEST + '/css'))
        .pipe($.size({ title: 'styles' }));
});

gulp.task('fonts', function() {
    src.fonts = 'src/styles/font/**';
    return gulp.src(src.fonts)
        .pipe($.changed(DEST + '/fonts'))
        .pipe(gulp.dest(DEST + '/fonts'))
        .pipe($.size({
            title: 'fonts'
        }));
});

// Bundle
gulp.task('bundle', function(cb) {
    var started = false;
    var config = require('./config/webpack.js')(RELEASE);
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
gulp.task('build', ['clean'], function(cb) {
    runSequence(['vendor', 'assets', 'images', 'pages', 'styles', 'fonts', 'bundle'], cb);
});

// Launch a lightweight HTTP Server
gulp.task('serve', function(cb) {
    watch = true;

    runSequence('build', function() {
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

        gulp.watch(src.assets, ['assets']);
        gulp.watch(src.images, ['images']);
        gulp.watch(src.pages, ['pages']);
        gulp.watch(src.styles, ['styles']);
        gulp.watch(src.fonts, ['fonts']);
        gulp.watch(['src/**/*.jsx', 'src/**/*.js'], function(file) {
            browserSync.reload(path.relative(__dirname, file.path));
        });
        gulp.watch('build/js/**', function (obj) {
            if (obj.type === 'changed') {
                gulp.src(obj.path)
                    .pipe(gulp.dest('//10.100.10.16/Sparta/LAP.Site/LAP/js/pages/dashboard'))
                    .pipe(gulp.dest('///10.18.200.209/www/Sparta/LAP.Site/LAP/js/pages/dashboard'));
            }
        });
        gulp.watch('build/css/**', function (obj) {
            if (obj.type === 'changed') {
                gulp.src(obj.path)
                    .pipe(gulp.dest('//10.100.10.16/Sparta/LAP.Site/LAP/css/pages/dashboard/main'))
                    .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/dashboard/main'));
            }
        });
        cb();
    });
});

gulp.task('copytoLocal',['build'], function(cb) {
    gulp.src('build/css/**')
    .pipe(gulp.dest('//10.100.10.16/Sparta/LAP.Site/LAP/css/pages/dashboard/main'))
    .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/dashboard/main'));

    return gulp.src('build/js/**')
    .pipe(gulp.dest('//10.100.10.16/Sparta/LAP.Site/LAP/js/pages/dashboard'))
    .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/js/pages/dashboard'));
});

// Deploy to GitHub Pages
gulp.task('copytoSVN', function(cb) {
    // Remove temp folder

    src.fonts = 'build/font/**';
    gulp.src(src.fonts)

    .pipe(gulp.dest(svnPath + '/css/pages/dashboard/fonts'))
        .pipe($.size({
            title: 'fonts'
        }));

    src.css = 'build/css/**';
    gulp.src(src.css)

    .pipe(gulp.dest(svnPath + '/css/pages/dashboard/main'))
        .pipe($.size({
            title: 'css'
        }));

    src.js = 'build/js/**';
    return gulp.src(src.js)

    .pipe(gulp.dest(svnPath + '/js/pages/dashboard'))
        .pipe($.size({
            title: 'js'
        }));

});

gulp.task("deploy", ['build', 'copytoSVN']);
// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
    // By default, we use the PageSpeed Insights
    // free (no API key) tier. You can use a Google
    // Developer API key if you have one. See
    // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
    url: 'https://example.com',
    strategy: 'mobile'
}));