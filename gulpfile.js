var gulp = require('gulp');
var webserver = require('gulp-webserver');
var child = require('child_process');
var clean = require('gulp-clean');

gulp.task('clean', function() {
	gulp.src('dist', {
		read: false
	}).pipe(clean());
});

gulp.task('stop', ['clean'], function() {
	var pid = -1;
	child.exec("sudo netstat -tulpn | grep 8000").stdout.on('data', function (data) {
		var split = data.split(/\s/).filter(
			function(word){return word.length > 0;});
		pid = split[6].split(/\//)[0];
		if (pid > -1) {
			var cmd = "sudo kill -9 " + pid;
			console.log("killing "+pid);
			child.exec(cmd);
		}
	});
});

gulp.task('copy', function() {
	gulp.src([
		'app/**/*',
		'!app/js',
		'!app/js/**/*',
		])
	.pipe(gulp.dest('dist'))
});

gulp.task('build', ['copy'], function() {
	child.exec('browserify -t reactify ./app/main.js -o ./dist/main.js');
});

gulp.task('serve', ['build'], function(done) {
	gulp.src('dist')
	.pipe(webserver({
		livereload: true,
		open: true
	}));
});

var watcher = gulp.watch('app/**/*', ['build']);
// watcher.on('change', function(event) {
// 	console.log(event);
// });