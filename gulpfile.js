var glob = require('glob');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var envify = require('envify');

var sourceJs = './js/main.js';
var destJs = './compiled-demo.js';
var bundleFolder = 'dist/bundle/'

var reload = browserSync.reload;

gulp.task('reactify-editor', function() {
    return browserify(
        {
            entries: glob.sync(sourceJs)
        })
        .transform(reactify)
        .transform(envify)
        .bundle()
        .pipe(source(destJs))
        .pipe(gulp.dest(bundleFolder))
        .pipe(notify('Browserify done!'));
});

gulp.task('minify-js', function() {
    gulp.src('./dist/bundle/compiled-demo.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./dist/bundle'))
        .pipe(reload({
            stream: true,
            once: true
        }))
        .pipe(notify('JS compressed by Uglify.'));
});

gulp.task('build-react-app', function(cb) {
    runSequence('reactify-editor', 'minify-js', cb);
});
