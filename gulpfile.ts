import * as gulp from 'gulp'
import * as sass from 'gulp-sass'
import * as rename from 'gulp-rename'
import * as autoprefixer from "autoprefixer"
import * as gzip from "gulp-gzip"
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const postcssflexbugsfixes = require('postcss-flexbugs-fixes');

gulp.task('sass', () => {
  var plugins = [
        autoprefixer({
          browsers: [
            'Chrome >= 35',
            'Firefox >= 38',
            'Edge >= 12',
            'Explorer >= 10',
            'iOS >= 8',
            'Safari >= 8',
            'Android 2.3',
            'Android >= 4',
            'Opera >= 12'
          ]
        }),
        postcssflexbugsfixes()
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

gulp.task('gzip', () => {
  return gulp.src('./dist/css/**/*.min.css')
    .pipe(gzip())
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('build', ['sass','cssnano','gzip'], () => {

})

gulp.task('watch', () => {
  gulp.watch('./scss/**/*.scss', ['sass','cssnano']);
})

gulp.task('dev',['build','watch','gzip'],()=>{
  
})