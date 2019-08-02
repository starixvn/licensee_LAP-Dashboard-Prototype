/*!
 * Facebook React Starter Kit | https://github.com/kriasoft/react-starter-kit
 * Copyright (c) KriaSoft, LLC. All rights reserved. See LICENSE.txt
 */

'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');

gulp.task('copytoLocal', function (cb) {
    //JS
    gulp.src('build/js/build/summary/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/js/pages/analytics/summary'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/js/pages/analytics/summary'));

    gulp.src('build/js/build/performance/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/js/pages/analytics/performance'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/js/pages/analytics/performance'));

    gulp.src('build/js/build/vendors/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/js/pages/analytics/vendors'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/js/pages/analytics/vendors'));

    //CSS
    gulp.src('build/css/build/dashboard/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/css/pages/analytics/dashboard'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/analytics/dashboard'));

    gulp.src('build/css/build/summary/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/css/pages/analytics/summary'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/analytics/summary'));

    gulp.src('build/css/build/performance/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/css/pages/analytics/performance'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/analytics/performance'));

    gulp.src('build/css/build/fonts/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/css/pages/analytics/fonts'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/css/pages/analytics/fonts'));

    return gulp.src('build/js/build/dashboard/**')
        .pipe(gulp.dest('//10.18.200.202/www/Sparta/LAP.Site/LAP/js/pages/analytics/dashboard'))
        .pipe(gulp.dest('//10.18.200.209/www/Sparta/LAP.Site/LAP/js/pages/analytics/dashboard'));
});