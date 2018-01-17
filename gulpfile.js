var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var wiredep = require('wiredep').stream;
var imagemin = require('gulp-imagemin');


// compress images
gulp.task('images', function() {
 return gulp.src('src/images/*.*')
  .pipe(imagemin())
  .pipe(gulp.dest('./prod/images'))
});

gulp.task('bower', function () {
 return gulp.src('./bower_components*/**')
  .pipe(gulp.dest('prod'));
});

// delete prod and all subfolders and files
gulp.task('clean', function () {
 return gulp.src('./prod/**/*.*', {read: false})
  .pipe(clean());
});

gulp.task('scripts', function () {
 return gulp.src('src/js/**/*.js')
 // jshint - static code analysis
  .pipe(jshint())
  .pipe(jshint.reporter('default',console.log('ALL DONE!!!')))
  // combine all js file in one  app.js file
  .pipe(concat('app.js'))
  // minimise js file
  .pipe(uglify())
  .pipe(gulp.dest('prod/js'))
});

gulp.task('styles', function () {
 return gulp.src('./src/css/*.scss')
 // combine all scss file in one styles.scss  file
  .pipe(concat('styles.scss'))
    .pipe(sass({
     outputStyle: 'compressed' // minimise styles.css
    }).on('error', sass.logError)) // styles.scss  => styles.css
  // copy file to end point folder =>
  .pipe(gulp.dest('prod/css'))
});

// task for html file, copy and reload
gulp.task('html', function () {
 return gulp.src('./src/index.html')
  .pipe(wiredep({
   directory : 'bower_components'
  }))
  .pipe(gulp.dest('prod'))
});

gulp.task('watch', function() {
 gulp.watch('./src/css/*.scss', gulp.series('styles'));
 gulp.watch('./src/*.html',gulp.series('html'));
 gulp.watch('./src/js/*.js', gulp.series('scripts'));
 gulp.watch('./src/images/*', gulp.parallel('images'));
 gulp.watch('bower.json', gulp.series('bower','html'));
});

// task copy-build all folder in prod
gulp.task('copy-build', gulp.series('scripts', 'styles', 'html','images', 'bower'));
// del prod folder
gulp.task('prod', gulp.series('clean', 'copy-build'));
// default task => yarn start  || gulp
gulp.task('default', gulp.series('prod',gulp.parallel('watch')));
