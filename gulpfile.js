/* 
* @Author: Marte
* @Date:   2017-11-10 17:58:01
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-12 10:37:08
*/

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('compile',function(){
    gulp.src('./src/sass/*.scss')
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
        .pipe(gulp.dest('./src/css/'));
})

gulp.task('header',function(){
    gulp.src('./src/sass/header.scss')
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
        .pipe(gulp.dest('./src/css/'))
});

gulp.task('jt',function(){
    gulp.watch('./src/sass/*.scss',['compile'])
});