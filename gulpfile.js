const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const gulpStylelint = require('gulp-stylelint');

const templateMainPath = 'assets/templates/main/';
const distMainPath = 'assets/templates/main/dist/';

const taskPostcss = () => {
  return gulp
    .src(templateMainPath + 'postcss/main.css')
    .pipe(postcss())
    .pipe(rename('main.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(distMainPath));
};

const taskServe = () => {
  gulp.watch(templateMainPath + 'postcss/*.css', taskPostcss);
};

const taskWatch = () => {
  gulp.watch(templateMainPath + 'postcss/*.css', taskPostcss);
};

const taskLintCSS = () => {
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
    }));
};

gulp.task('default', taskServe);
gulp.task('watch', taskWatch);
gulp.task('lint:css', taskLintCSS);
