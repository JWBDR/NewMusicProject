const { series, src, dest, watch } = require("gulp");
const htmlClean = require("gulp-htmlclean");
const less = require("gulp-less");
const cleanCss = require("gulp-clean-css");
const stripDebug = require('gulp-strip-debug')
const uglify = require("gulp-uglify");
const imgMin = require("gulp-imagemin");
const connect = require("gulp-connect");
const babel = require('gulp-babel');


const folder = {
    //方便修改路径
    src: 'src/',
    dist: 'dist/'
}

function html() {
    return src(folder.src + 'html/*')
        .pipe(htmlClean())
        .pipe(dest(folder.dist + 'html/'))
        .pipe(connect.reload())//热更新
}
function css() {
    return src(folder.src + 'css/*')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(dest(folder.dist + 'css/'))
        .pipe(connect.reload())

}
function js() {
    return src(folder.src + 'js/*')
        // .pipe(stripDebug())
        // .pipe(babel({
        //     presets:['env']
        // }))
        // .pipe(uglify())
        .pipe(dest(folder.dist + 'js/'))
        .pipe(connect.reload())

}
function image() {
    return src(folder.src + 'images/*')
        .pipe(dest(folder.dist + 'images/'))
}

function server(cb) {
    connect.server({
        port: '1573',//端口
        livereload: true, //热更新
    });
    cb();
}



//监听task
watch(folder.src + 'html/*',function (cb){
    html();
    cb()
})
watch(folder.src + 'css/*',function (cb){
    css();
    cb()
})
watch(folder.src + 'js/*',function (cb){
    js();
    cb()
})

exports.default = series(html, css, js, image, server)//导出











