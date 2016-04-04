// All the libs we're going to be using
var gulp = require('gulp'),
    less = require('gulp-less'),
    browserify = require('gulp-browserify'),
    watch = require('gulp-watch');

// Our various references
var frontendDir = './frontend',
    jsDir = frontendDir + '/javascript',
    lessDir = frontendDir + '/less',
    staticDir = './static';

var captureError = function(error){
    console.error(error.toString());
    this.emit('end');
};

gulp.task('build-js', function(){
    return gulp.src(jsDir + '/main.js')
        .pipe(browserify({
            insertGlobals: false,
            debug: false,
            transform: []
        }))
        .on('error', captureError)
        .pipe(gulp.dest(staticDir + '/js/'));
});

gulp.task('build-less', function(error){
    return gulp.src(lessDir + '/main.less')
        .pipe(less()).on('error', function(err){
            gutil.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest(staticDir + '/css/'));
});

gulp.task('build', ['build-js', 'build-less']);

gulp.task('watch', function(){
    gulp.start('build');

    watch(jsDir + "/**/*.{js,jsx}", function() {
        console.log('');
        console.log('-- JS Change Detected --');
        gulp.start('build-js');
        gulp.start('build-test');
    });

    watch(lessDir + "/**/*.{less}", function() {
        console.log('');
        console.log('-- LESS Change Detected --');
        gulp.start('build-less');
    });
});

gulp.task('default', ['build']);
