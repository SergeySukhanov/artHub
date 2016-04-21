/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/21/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('webapp/js/libs/'))
});