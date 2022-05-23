const { series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const postcss = require('gulp-postcss');
const pxtorem = require('postcss-pxtorem');

function compile() {
  const plugins = [
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
      minPixelValue: 1,
    }),
  ];
  // return src('./src/*.scss')
  return src(['./src/*.scss', '!./src/index.scss'])
    .pipe(sass.sync())
    .pipe(autoprefixer({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false,
    }))
    .pipe(postcss(plugins))
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

exports.build = series(compile);
