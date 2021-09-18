const gulp = require('gulp')
const cssnano = require('gulp-cssnano')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const gulpStylelint = require('gulp-stylelint')

const templateMainPath = 'assets/templates/main/'
const distMainPath = 'assets/templates/main/dist/'

const css = () => {
  return gulp
    .src(templateMainPath + 'postcss/main.css')
    .pipe(postcss())
    .pipe(rename('main.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(distMainPath))
}

const watch = () => {
  gulp.watch(templateMainPath + 'postcss/**/*.css', css)
}

const lint = () => {
  return gulp
    .src(templateMainPath + 'postcss/*.css')
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [
        {
          formatter: 'string',
          console: true,
        },
      ],
    }))
}

gulp.task('lint', lint)
gulp.task('default', watch)
gulp.task('watch', watch)
gulp.task('build', css)
