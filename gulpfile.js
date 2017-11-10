/* 
* @Author: Marte
* @Date:   2017-11-10 17:58:01
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-10 18:02:52
*/

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('compile',function(){
    gulp.src('./src/sass/home.scss')
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
        .pipe(gulp.dest('./src/css/'));
})