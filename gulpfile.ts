import * as gulp from 'gulp'
import * as sass from 'gulp-sass'
import * as autoprefixer from "autoprefixer"
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

gulp.task('sass', () => {
  var plugins = [
        autoprefixer(),
        cssnano()
    ];
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('build', ['sass'], () => {

})

gulp.task('watch', () => {
  gulp.watch('./scss/**/*.scss', ['sass']);
})

gulp.task('dev',['build','watch'],()=>{
  
})