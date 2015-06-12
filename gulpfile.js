var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    watch = require('gulp-watch'),
    using = require('gulp-using');

var paths = {
    dest: 'public',
    styles: ['source/**/*.css'],
    scripts: ['source/**/*.js'],
    templates: ['source/**/*.html', 'source/**/*.csv']
};

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(using())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(using())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('templates', function() {
    return gulp.src(paths.templates)
        .pipe(using())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('build', ['styles', 'scripts', 'templates']);

gulp.task('serve', ['build'], function() {
    var all = function (source) {
        return source.filter(function(path) { return path[0] != '!'; });
    };
    gulp.watch(all(paths.styles), ['styles']);
    gulp.watch(all(paths.scripts), ['scripts']);
    gulp.watch(all(paths.templates), ['templates']);

    var options = {
        livereload: false,
        open: false
    };
    return gulp.src(paths.dest)
        .pipe(webserver(options));
});

gulp.task('default', ['build']);