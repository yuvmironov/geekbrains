var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    csscomb = require('gulp-csscomb'),
    pug = require('gulp-pug');

gulp.task('styl', function () {
    gulp.src('sourse/blocks/site/index.styl')
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(csscomb())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('sourse/pre-relise'))
    //.pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
    gulp.src(['sourse/blocks/**/*.js']) // файлы, которые обрабатываем
        .pipe(concat('site.js')) // склеиваем все JS
        //.pipe(uglify()) // получившуюся "портянку" минифицируем
        .pipe(gulp.dest('sourse/pre-relise')) // результат пишем по указанному адресу
    //.pipe(browserSync.reload({stream: true})) // Обновляем браузер
});

gulp.task('image', function() {
    gulp.src(['sourse/images/**/**/*']) // берем любые файлы в папке и ее подпапках
        //.pipe(imagemin()) // оптимизируем изображения для веба
        .pipe(gulp.dest('sourse/pre-relise/images/')) // результат пишем по указанному адресу
    //.pipe(browserSync.reload({stream: true})) // Обновляем браузер
});

gulp.task('font', function(){
    gulp.src('sourse/fonts/**/*')
        .pipe(gulp.dest('sourse/pre-relise/fonts'))
});

gulp.task('pug', function () {
    gulp.src('sourse/blocks/site/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('sourse/pre-relise'))
    //.pipe(browserSync.reload({stream: true}))
});

/*gulp.task('liveReload', function () {
    browserSync({
        server: {
            baseDir: 'sourse/pre-relise' /!*Указываем главную папку со скриптами*!/
        },
        notify: false /!*Отключаем уведомления в браузере для комфортной работы*!/
    })
});*/

gulp.task('prodaction', function() {
    gulp.src('sourse/pre-relise/*.html')
        .pipe(gulp.dest('prodaction/'))
    gulp.src('sourse/pre-relise/site.js')
        .pipe(uglify())
        .pipe(gulp.dest('prodaction/'))
    gulp.src('sourse/pre-relise/style.css')
        .pipe(cssmin())
        .pipe(gulp.dest('prodaction/'))
    gulp.src('sourse/pre-relise/images/**/*')
        .pipe(imagemin()) // оптимизируем изображения для веба
        .pipe(gulp.dest('prodaction/images/')) // результат пишем по указанному адресу
    browserSync({
        server: {
            baseDir: 'prodaction/' /*Указываем главную папку со скриптами*/
        },
        notify: false /*Отключаем уведомления в браузере для комфортной работы*/
    })
});


gulp.task('default', [/*'liveReload'*/ 'styl', 'image', 'js', 'font', 'pug'], function () {
    gulp.watch('sourse/blocks/**/*.styl', ['styl']);
    gulp.watch('sourse/blocks/**/*.pug', ['pug']);
    gulp.watch('sourse/blocks/**/*.js', ['js']);
    gulp.watch('sourse/images/**/*', ['image']);
    gulp.watch('sourse/font/**/*', ['font']);
});