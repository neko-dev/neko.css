import * as gulp from 'gulp'
import * as sass from 'gulp-sass'
import * as rename from 'gulp-rename'
import * as autoprefixer from "autoprefixer"
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

gulp.task('sass', () => {
  var plugins = [
        autoprefixer()
    ];
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('cssnano', () => {
  var plugins = [
        cssnano()
    ];
  return gulp.src('./dist/css/**/*[!(.min)].css')
    .pipe(postcss(plugins))
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('build', ['sass','cssnano'], () => {

})

gulp.task('watch', () => {
  gulp.watch('./scss/**/*.scss', ['sass','cssnano']);
})

gulp.task('dev',['build','watch'],()=>{
  
})