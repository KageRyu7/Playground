var gulp = require('gulp');
var webserver = require('gulp-webserver');
var child = require('child_process');
var clean = require('gulp-clean');

gulp.task('clean', function() {
	return gulp.src('dist', {
		read: false
	}).pipe(clean());
});

gulp.task('copy', function() {
	gulp.src([
		'app/**/*',
		'!app/js',
		'!app/js/**/*',
		])
	.pipe(gulp.dest('dist'))
});

gulp.task('build', function(done) {
	child.exec('browserify -t reactify ./app/main.js -o ./dist/main.js');
});

gulp.task('serve', function() {
	gulp.src('dist')
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

gulp.task('run', ['clean','copy', 'build', 'serve'])