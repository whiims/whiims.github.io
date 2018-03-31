'use strict';

import autoprefixer from "gulp-autoprefixer";
import browserSync  from "browser-sync";
import concat       from "gulp-concat";
import gulp         from "gulp";
import imagemin     from "gulp-imagemin";
import pug          from "gulp-jade";
import loadPlugins  from "gulp-load-plugins";
import minimist     from "minimist";
import path         from "path";
import plumber      from "gulp-plumber";
import pngquant     from "imagemin-pngquant";
import sass         from "gulp-sass";
import sassGlob     from "gulp-sass-glob";
import sassLint     from "gulp-sass-lint";
import uglify       from "gulp-uglify";

const $           = loadPlugins();
const reload      = browserSync.reload;

const SRC_DIR     = "src";
const DEST_DIR    = ".";

const PUG_DIR     = path.join(SRC_DIR, "pug");
const SCSS_DIR    = path.join(SRC_DIR, "scss");
const IMAGES_DIR  = path.join(SRC_DIR, "images");
const SCRIPTS_DIR = path.join(SRC_DIR, "scripts");

var env = minimist(process.argv.slice(2));
var port = env.p || 3000;

const PUG_OPTIONS = {
    pretty: true,
    escapePre: true
};

const SASS_OPTIONS = {
    outputStyle: "compressed"
};

const IMAGEMIN_OPTIONS = {
    progressive: true,
    use: [
        pngquant({
            quality: '65-80',
            speed: 1
        })
    ]
}

const BROWSER_SYNC_OPTIONS = {
    server: [SRC_DIR, DEST_DIR],
    port: port,
    open: false
};

gulp.task("pug", () => {
    return gulp.src([path.join(PUG_DIR, "**/*.pug")])
        .pipe(plumber())
        .pipe(pug(PUG_OPTIONS))
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task("scss", () => {
    return gulp.src(path.join(SCSS_DIR, "**/main.{scss,css}"))
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(sassGlob())
        .pipe(sass(SASS_OPTIONS))
        .pipe(autoprefixer())
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task("sass-lint", () => {
    return gulp.src(path.join(SCSS_DIR, "*/*.s+(a|c)ss"))
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});
gulp.task("scss-lint", ["sass-lint"]);

gulp.task("imagemin", () => {
    return gulp.src(path.join(IMAGES_DIR, "**/*.{jpg,jpeg,png,gif,svg}"))
        .pipe(imagemin(IMAGEMIN_OPTIONS))
        .pipe(gulp.dest(path.join(DEST_DIR, "images")));
});

gulp.task("jsmin", () => {
    return gulp.src(path.join(SCRIPTS_DIR, "**/*.js"))
        // .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest(path.join(DEST_DIR, "scripts")));
});

gulp.task("jsconcat", () => {
    return gulp.src(path.join(SCRIPTS_DIR, "**/*.js"))
        .pipe(plumber())
        .pipe(concat("zinken.js"))
        .pipe(gulp.dest(path.join(DEST_DIR, "scripts")));
});

gulp.task("compile", ["pug", "scss", "imagemin", "jsmin", "jsconcat"]);

gulp.task("watch", ["compile"], () => {
    browserSync(BROWSER_SYNC_OPTIONS);

    gulp.watch([path.join(PUG_DIR, "**/*.*")], ["pug", reload]);
    gulp.watch([path.join(SCSS_DIR, "**/*.{scss,css}")], ["scss", reload]);
    gulp.watch([path.join(IMAGES_DIR, "**/*.{jpg,jpeg,png,gif,svg}")], ["imagemin", reload]);
    gulp.watch([path.join(SCRIPTS_DIR, "**/*.js")], ["jsmin", "jsconcat", reload]);
});
