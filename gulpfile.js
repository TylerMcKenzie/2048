var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('build', function() {
  gulp.src('./js/*.js')
      .pipe(concat('index.js'))
      .pipe(gulp.dest(''))
});

gulp.task('watch', function() {
  gulp.watch('./js/*.js', ['build']);
})

gulp.task('default', ['build', 'watch'])