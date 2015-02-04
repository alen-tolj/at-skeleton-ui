// Basic Gulp File
var gulp = require('gulp'),
    less = require('gulp-less')
autoprefix = require('less-plugin-autoprefix')
rename = require("gulp-rename")
bower = require('gulp-bower');
path = require('path');
var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css');


var config = {
    sassDir: './scss',
    bowerDir: './bower_components'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest('./webapp/fonts'));
});

gulp.task('less', function () {
    gulp.src('./less/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(minifyCSS())
        .pipe(rename("app.css"))
        .pipe(gulp.dest('./webapp/css/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassDir + '/**/*.scss', ['css']);
});


gulp.task('default', ['bower', 'icons', 'css']);
