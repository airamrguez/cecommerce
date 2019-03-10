const { parallel, series, src, dest, watch } = require('gulp');
const webpack = require('webpack');
const webpackstream = require('webpack-stream');
const del = require('del');
const browsersync = require('browser-sync').create();
const webpackConfigDev = require('./webpack.config.dev');
const jsonServer = require('gulp-json-srv');

const db = jsonServer.create();
const destPath = 'build';

function scripts() {
  return src('src/')
    .pipe(webpackstream(webpackConfigDev, webpack))
    .pipe(dest(destPath))
    .pipe(browsersync.stream());
}

function html() {
  return src('public/*.html')
    .pipe(dest(destPath))
    .pipe(browsersync.stream());
}

function startDB() {
  return src('./db.json')
    .pipe(db.pipe())
    .pipe(browsersync.stream());
}

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: `${destPath}`,
    },
    port: 8080,
  });
  done();
}

function reload(done) {
  browsersync.reload();
  done();
}

function watchFiles() {
  watch(['src/**/*.{scss,js,svg,png,jpg,gif}', 'db.json'], reload);
}

function clean() {
  return del([destPath]);
}

exports.start = series(
  clean,
  parallel(startDB, browserSync, scripts, html),
  watchFiles,
);

// There should also be a real build step for production using
// process.env.NODE_ENV === 'production' that trims a lot of React
// base code and using a minification process using a webpack production
// config with production mode and a minification plugin like terser-webpack-plugin.
// exports.build = series(clean, parallel(scripts, html));

exports.default = scripts;
