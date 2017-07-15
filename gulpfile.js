var gulp = require('gulp');
var webserver = require('gulp-webserver');
var child = require('child_process');

gulp.task('copy', function() {
	gulp.src('app/index.html')
	.pipe(gulp.dest('dist'))
});

gulp.task('serve', function() {
	gulp.src('dist')
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

gulp.task('build', function(done) {
	//child.exec('browserify -g ./app/main.js -o ./dist/main.js');
	child.exec('browserify -t reactify ./app/main.js -o ./dist/main.js');
});

gulp.task('run', ['copy', 'build', 'serve'])