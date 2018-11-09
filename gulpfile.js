var less = require("gulp-less");
var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var connect = require("gulp-connect");


gulp.task('less', function () {
    gulp.src('./scss/*.less')
      .pipe(less())
      .pipe(gulp.dest('./css'))
      .pipe(connect.reload());
  });

gulp.task('http-server', function() {
    connect.server({
        livereload: true,
        port: 4200
    })

    console.log('Server listening on http://localhost:4200');
});

gulp.task('watch', function() {

    gulp.run('less');

    gulp.watch('./scss/*.less', function() {
            gulp.run('less');
     });

    gulp.watch('index.html', function() {
        gulp.src('index.html')
            .pipe(connect.reload())
    });
 
    gulp.run('http-server');
});

gulp.task('build', function() {
    gulp.src('./assets/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/assets'))

    gulp.src('./css/*')
        .pipe(gulp.dest('./build/css'))

    gulp.src('./index.html')    
        .pipe(gulp.dest('./build/'))
})