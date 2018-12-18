var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


gulp.task('app', function(){
    return gulp.src([
        'app/app.js',
        'app/components/*.js',
        'app/components/app.components.js'
      
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('app/build'));
});

gulp.task('vendor', function () {
    return gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'app/assets/js/ng-table.min.js'
        
        
    ])
    .pipe(concat('vendor.js', { newLine: ';' }))
    .pipe(gulp.dest('app/build'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('app/build'));

});

gulp.task('build', function(){
    gulp.start('app', 'vendor'); 
});