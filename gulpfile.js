var gulp                = require('gulp');
var autoprefixer        = require('gulp-autoprefixer');
var concat              = require('gulp-concat');
var imagemin            = require('gulp-imagemin');
var jshint              = require('gulp-jshint');
var livereload          = require('gulp-livereload');
var minifycss           = require('gulp-minify-css');
var nodemon             = require('gulp-nodemon');
var plumber             = require('gulp-plumber');
var rename              = require('gulp-rename');
var sass                = require('gulp-sass');
var sourcemaps          = require('gulp-sourcemaps');
var uglify              = require('gulp-uglify');

var path = {
    script: ['./assets/js/**/*.js', './assets/js/*.js'],
    styles: ['./assets/sass/**/*.scss', './assets/sass/*.scss'],
    image: './assets/img/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,svg,SVG,gif,GIF}'
};

gulp.task('img', function() {
    return gulp.src(path.image, { base:'./assets/img/' })
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 4
        }))
        .pipe(gulp.dest('./public/img'));
});

gulp.task('lint', function() {
    return gulp.src(path.script)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(plumber.stop());
});

gulp.task('js', function() {
    return gulp.src(path.script)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('css', function() {
    return gulp.src(path.styles)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: [
                'last 2 version',
                'safari 5',
                'ie 8',
                'ie 9',
                'opera 12.1'
            ],
            remove: true
        }))
        .pipe(concat('style.min.css'))
        .pipe(minifycss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
    gulp.watch(path.script, ['lint', 'js']);
    gulp.watch(path.styles, ['css']);
    gulp.watch(path.image, ['img']);
});

gulp.task('default', ['img', 'lint', 'js', 'css'], function() {
    nodemon({
        script: 'server.js'
    })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function() {
        console.log('Server restarted');
    });
});
