var autoprefixer        = require('autoprefixer');
var del                 = require('del');
var gulp                = require('gulp');
var postcss             = require('gulp-postcss');
var concat              = require('gulp-concat');
var server              = require('gulp-develop-server');
var imagemin            = require('gulp-imagemin');
var jshint              = require('gulp-jshint');
var livereload          = require('gulp-livereload');
var minifycss           = require('gulp-minify-css');
var newer               = require('gulp-newer');
var plumber             = require('gulp-plumber');
var sass                = require('gulp-sass');
var sourcemaps          = require('gulp-sourcemaps');
var uglify              = require('gulp-uglify');
var path                = require('path');

var srcPath = {
    scripts:    'src/js/**/*.js',
    styles:     'src/sass/**/*.scss',
    images:     'src/assets/img/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,svg,SVG,gif,GIF}',
    libs:       'src/libs/**/*.*',
    views:      ['src/views/**/*.html', 'src/index.html']
};

gulp.task('images', function() {
    del(['./dist/assets/img'], function() {
        gulp.src(srcPath.images, { base:'./src/assets/img/' })
            .pipe(imagemin({
                progressive: true,
                optimizationLevel: 5
            }))
            .pipe(gulp.dest('./dist/assets/img'));
    });
});

gulp.task('imagesDev', function() {
    del(['./dist/assets/img'], function() {
        gulp.src(srcPath.images, { base:'./src/assets/img/' })
            .pipe(gulp.dest('./dist/assets/img'));
    });
});

gulp.task('lint', function() {
    return gulp.src(srcPath.scripts)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(plumber.stop());
});

gulp.task('scripts', function() {
    del([
        './dist/js'
    ], function() { gulp.src(srcPath.scripts)
        .pipe(plumber())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist/js'));
    });
});

gulp.task('scriptsDev', function() {
    del([
        './dist/js'
    ], function() { gulp.src(srcPath.scripts)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/js'));
    });
});

gulp.task('styles', function() {
    var cssProcessors = [
        autoprefixer({
            browsers: [
                'last 2 version',
                'safari 5',
                'ie 8',
                'ie 9',
                'opera 12.1'
            ],
            remove: true
        })
    ];

    del([
        './dist/css'
    ], function() { gulp.src('./src/sass/application.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(postcss(cssProcessors))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./dist/css'));
    });
});

gulp.task('stylesDev', function() {
    var cssProcessors = [
        autoprefixer({
            browsers: [
                'last 2 version',
                'safari 5',
                'ie 8',
                'ie 9',
                'opera 12.1'
            ],
            remove: true
        })
    ];

    del([
        './dist/css'
    ], function() { gulp.src('./src/sass/application.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(postcss(cssProcessors))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
    });
});

gulp.task('html', function() {
    return del([
        './dist/views',
        './dist/index.html'
    ], function() { gulp.src([
            './src/**',
            './src/views/**',
            '!./src/{libs,libs/**,libs/**/*.*}',
            '!./src/{js,js/**,js/**/*.*}',
            '!./src/{assets,assets/**,assets/**/*.*}',
            '!./src/{sass,sass/**,sass/**/*.*}'
        ])
        .pipe(gulp.dest('./dist'));
    });
});

gulp.task('libs', function() {
    del([
        './dist/libs'
    ], function() {
        return gulp.src(srcPath.libs)
            .pipe(gulp.dest('./dist/libs'));
    });
});

gulp.task( 'server:start', ['imagesDev', 'lint', 'scriptsDev', 'stylesDev', 'html', 'libs'], function() {
    server.listen({
        path: './server.js'
    }, livereload.listen);
});

gulp.task( 'default', [
        'server:start'
    ], function() {
        gulp.watch(srcPath.scripts, ['lint', 'scriptsDev']).on('change', function() {
            livereload();
        });
        gulp.watch(srcPath.styles, ['stylesDev']).on('change', function() {
            livereload();
        });
        gulp.watch(srcPath.images, ['imagesDev']).on('change', function() {
            livereload();
        });
        gulp.watch(srcPath.views, ['html']).on('change', function() {
            livereload();
        });
        gulp.watch(srcPath.libs, ['libs']).on('change', function() {
            livereload();
        });
        gulp.watch('./server.js').on('change', function() {
            server.restart();
            livereload();
        });
    });

gulp.task('build', ['images', 'lint', 'scripts', 'styles', 'html', 'libs']);
