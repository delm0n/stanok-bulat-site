const gulp = require("gulp");
const { src, series, parallel, dest } = require("gulp");
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const terser = require("gulp-terser"); // минифицирует js
const cssnano = require("cssnano"); // минифицирует css

const gcmq = require("gulp-group-css-media-queries"); // сливает однинаковые media
const autoprefixer = require("gulp-autoprefixer"); // расставляет префиксы  // сливает однинаковые media
const cleancss = require("gulp-clean-css"); // минифицирует css
const sass = require("gulp-sass")(require("sass")); // работа с scss

const imagemin = require("gulp-imagemin"); // оптимизирует изображения
const pngquant = require("imagemin-pngquant"); // качественно сжимает png
const webp = require("gulp-webp"); // конвертирует изображения в webp

const babel = require("gulp-babel"); // компиляция скрипты в es5

const webpack = require("webpack-stream");
const configWebpackDev = {
  output: {
    filename: "main.js",
  },
  optimization: {
    minimize: false,
  },
  mode: "development",
};
const configWebpackProd = {
  output: {
    filename: "main.js",
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: false,
  },
  mode: "production",
};

// пути к файлам
const paths = {
  styles: {
    src: "styles/main.css",
    dest: "styles/",
  },
  scripts: {
    src: "scripts/custom.js",
    dest: "scripts/",
  },
  img: {
    src: "images/images-gulp-storage/**.*",
    dest: "images-gulp-optimize/",
  },
  vue: {
    src: "vue/vue.js",
    dest: "vue/",
  },
};

//лучше запустить через npm run watch
// // отслеживание sass
// function sassTask() {
//     return gulp.src('styles/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('styles'))
// }
// function watchSass() {
//     return gulp.watch('styles/*.scss', gulp.series(sassTask))
// }

// сборка стилей

function cssTask() {
  return src(paths.styles.src)
    .pipe(concat("main.min.css"))
    .pipe(gcmq())
    .pipe(autoprefixer())
    .pipe(
      cleancss({
        level: {
          1: {
            specialComments: 0,
          },
        },
      })
    )
    .pipe(dest(paths.styles.dest));
}

// минификация основного скрипта
function jsTask() {
  return src(paths.scripts.src)
    .pipe(concat("custom.min.js"))
    .pipe(terser())
    .pipe(dest(paths.scripts.dest));
}

// оптимизация изображений
function imgTask() {
  return src(paths.img.src)
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        pngquant({ quality: [0.8, 0.8] }),
      ])
    )
    .pipe(gulp.dest(paths.img.dest));
}

function webpTask() {
  return src(paths.img.src).pipe(webp()).pipe(gulp.dest(paths.img.dest));
}

//сборка vue
function vueTaskDev() {
  return src(paths.vue.src)
    .pipe(webpack(configWebpackDev))
    .pipe(dest(paths.vue.dest));
}
function vueWatch() {
  gulp.watch(
    ["vue/components/*.js", "vue/mixins/*.js", "vue/store.js", paths.vue.src],
    gulp.series(vueTaskDev)
  );
}
function vueTaskProd() {
  return src(paths.vue.src)
    .pipe(webpack(configWebpackProd))
    .pipe(dest(paths.vue.dest));
}
function vueBuildProd() {
  return src("vue/main.js")
    .pipe(concat("main.min.js"))
    .pipe(babel())
    .pipe(terser())
    .pipe(dest(paths.vue.dest));
}

exports.vue = vueWatch;
exports.css = cssTask;
exports.js = jsTask;

exports.build = series(parallel(cssTask, jsTask));
exports.buildImg = series(imgTask, webpTask);
exports.buildVue = series(vueTaskProd, vueBuildProd);
