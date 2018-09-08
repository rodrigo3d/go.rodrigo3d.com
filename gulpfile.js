'use strict';

var cp = require('child_process');

/*
 * dev Dependências
 */
var browserSync = require('browser-sync').create();
var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var template = require('gulp-template');
var runSequence = require('run-sequence');

var pkg = require('./package.json');

var banner = [
  '/*!\n',
  ' * RODRIGO3D.COM - <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright ' + new Date().getFullYear(),
  ' <%= pkg.author.name %> - <%= pkg.author.email %>\n',
  ' * Licenciado sob <%= pkg.license %> (https://github.com/rodrigo3d/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

var messages = {
  js: '<span style="color: red">Running:</span> $ Compilando arquivos JavaScript',
  sass: '<span style="color: red">Running:</span> $ Compilando arquivos SCSS',
  html: '<span style="color: red">Running:</span> $ Compilando arquivos HTML'
};

/*
 * Tarefa do Gulp, recompila e recarrega as páginas
 */
gulp.task('browser-sync-reload', function () {
  browserSync.notify(messages.html)
  browserSync.reload();
});

/*
 * Tarefa do Gulp, configura o browserSync
 */
gulp.task('browser-sync', function () {
  browserSync.init({
    port: 3000,
    ui: { port: 3001 },
    server: { baseDir: './_site', directory: false, index: 'index.html' }
  });
});

/*
 * Tarefa do Gulp para minimizar arquivos SASS e concatenar em um único arquivo
 * src: ./src/scss/clean-blog.scss
 * dest: ./website/assets/css/clean-blog.min.css
 */
gulp.task('html', function () {
  browserSync.notify(messages.html)
  return gulp.src(['./index.html'])
    .pipe(plumber())
    .pipe(template({
      title: pkg.name.toUpperCase(),
      description: pkg.description,
      color: pkg.color,
      author_name: pkg.author.name,
      author_email: pkg.author.email
    }))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('./_site'))
    .pipe(browserSync.stream())
    .pipe(plumber.stop());
});

/*
 * Tarefa do Gulp para minimizar arquivos SASS e concatenar em um único arquivo
 * src: ./src/scss/clean-blog.scss
 * dest: ./website/assets/css/clean-blog.min.css
 */
gulp.task('sass:configure', function () {
  browserSync.notify(messages.sass)
  return gulp.src(['./src/scss/_variables-custom.scss'])
    .pipe(plumber())
    .pipe(template({
      color: pkg.color
    }))
    .pipe(rename({ suffix: '.new' }))
    .pipe(gulp.dest('./src/scss'))
    .pipe(browserSync.stream())
    .pipe(plumber.stop());
});

gulp.task('sass', ['sass:configure'], function () {
  browserSync.notify(messages.sass)
  return gulp.src(['./src/scss/main.scss'])
    .pipe(plumber())
    .pipe(sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError))
    //   .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./_site/assets/css'))
    // .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream())
    .pipe(plumber.stop());
});

/*
 * Tarefa do Gulp para minimizar arquivos .js e concatena-los em um único arquivo.
 * src: ./src/js
 * dest: ./source/assets/js
 */
gulp.task('js', function () {
  browserSync.notify(messages.js)
  return gulp.src(['./src/js/**/0*.js', '!./src/js/**/*.min.*'])
    .pipe(plumber())
    .pipe(concat('main.js'))
    // .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./_site/assets/js'))
    // .pipe(gulp.dest('./source/assets/js'))
    .pipe(browserSync.stream())
    .pipe(plumber.stop());
});

/*
 * Tarefa do Gulp para minimizar arquivos de Imagem
 * src: ./src/img
 * dest: ./source/assets/img
 */
gulp.task('imagemin:screenshot', function () {
  return gulp.src(['./screenshot.png'])
    .pipe(plumber())
    // .pipe(gulp.dest('./source/assets/img'))
    .pipe(gulp.dest('./_site'))
    .pipe(browserSync.stream())
    .pipe(plumber.stop());
});
gulp.task('imagemin:cp', function () {
  return gulp.src(['./src/img/**/*.{xml,webmanifest}'])
    .pipe(plumber())
    // .pipe(gulp.dest('./source/assets/img'))
    .pipe(gulp.dest('./_site/assets/img'))
    .pipe(browserSync.stream())
    .pipe(plumber.stop());
});
gulp.task('imagemin', ['imagemin:screenshot', 'imagemin:cp'], function () {
  return gulp.src(['./src/img/**/*.{gif,jpg,jpeg,png,svg,ico}', '!./src/img/**/*.fw.png'])
    .pipe(plumber())
    .pipe(imagemin({ interlaced: true, progressive: true, optimizationLevel: 5, svgoPlugins: [{ removeViewBox: false }] }))
    // .pipe(gulp.dest('./source/assets/img'))
    .pipe(gulp.dest('./_site/assets/img'))
    .pipe(browserSync.stream())
    .pipe(plumber.stop());
});

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

  // Bootstrap
  gulp.src([
    './node_modules/bootstrap/dist/**/*.min.*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*',
    '!./node_modules/bootstrap/dist/**/*.map'
  ])
    .pipe(gulp.dest('./_site/assets/vendor/bootstrap'))

  // Font Awesome
  gulp.src([
    './node_modules/font-awesome/**/*.min.*',
    './node_modules/font-awesome/**/fonts/*',
    '!./node_modules/font-awesome/{less,less/*}',
    '!./node_modules/font-awesome/{scss,scss/*}',
    '!./node_modules/font-awesome/.*',
    '!./node_modules/font-awesome/*.{txt,json,md}',
    '!./node_modules/font-awesome/**/*.map'
  ])
    .pipe(gulp.dest('./_site/assets/vendor/font-awesome'))

  // jQuery
  gulp.src([
    './node_modules/jquery/dist/*.min.*',
    '!./node_modules/jquery/dist/core.js',
    '!./node_modules/jquery/dist/*.map'
  ])
    .pipe(gulp.dest('./_site/assets/vendor/jquery'))

  // Copy Custom Files
  gulp.src([
    './_redirects'
  ])
    .pipe(gulp.dest('./_site'))

});

/*
 * Tarefa do Gulp para limpar o diretório de saída
 * dir: ./site, ./assets, ./source/assets
 */
gulp.task('clean', function () {
  return del([
    './_site', './src/scss/_variables-custom.new.scss'
  ]);
});

/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('src/img/**/*.{gif,jpg,jpeg,png,svg,ico}', ['imagemin']);
  gulp.watch(['./*.html'], ['html']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['clean'], function () {
  runSequence('html', 'sass', 'js', 'imagemin', 'vendor', 'browser-sync', 'watch');
});

// Gulp task to build all files
gulp.task('build', ['clean'], function () {
  runSequence('html', 'sass', 'js', 'imagemin', 'vendor');
});

// Gulp task to build all files
gulp.task('dev', function () {
  runSequence('html', 'sass', 'js', 'browser-sync', 'watch');
});
