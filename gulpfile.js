/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/21/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var gulp = require("gulp");
var server = require('gulp-develop-server');
var bower = require('gulp-bower');

gulp.task('server:start', function(){
    server.listen({path:'./server.js'});
});

gulp.task('server:restart', function(){
    gulp.watch(['./server.js'], server.restart);
});

gulp.task('bower', function(){
    return bower()
        .pipe(gulp.dest('webapp/js/lib'));
});

gulp.task('start', ['bower', 'server:start']);