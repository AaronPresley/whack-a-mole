// All the libs we're going to be using
var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    watch = require('gulp-watch');

// Our various references
var frontendDir = './frontend',
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
        }))
        .on('error', captureError)
        .pipe(gulp.dest(staticDir + '/js/'));
});

gulp.task('watch', function(){
    gulp.start('build-js');
    watch(frontendDir + "/**/*.{js,jsx}", function() {
        console.log('');
        console.log('-- JS Change Detected --');
        gulp.start('build-js');
        gulp.start('build-test');
    });
});

gulp.task('default', ['build-js']);
