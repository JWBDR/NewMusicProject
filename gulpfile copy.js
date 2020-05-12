// var gulp = require("gulp");
// console.log(gulp)

// const { series, parallel } = require('gulp');//结构赋值

//任务
// function fn1(cb){
//     console.log('fn1被调用');
//     cb();//用来告诉，这个任务，走到这儿就结束了
// }
// function fn2(cb){
//     console.log('fn2被调用');
//     cb();//用来告诉，这个任务，走到这儿就结束了
// }
// // exports.build = fn1;//build是任务被导出后的名字；//gulp build ;打印出fn1被调用了
// exports.default = series(fn1,fn2);//导出并执行任务；series()是用来执行任务的，里面可以放多个任务,依次执行；

//const { series, parallel } = require('gulp');//结构赋值
// function js(cb){
//     console.log('js被调用了')
//     cb()
// }
// function css(cb){
//     console.log('css被调用了')
//     cb()
// }
// function html(cb){
//     console.log('html被调用了')
//     cb()
// }


// exports.default = series(js,css);//依次执行；
// exports.default = parallel(js,css);//同时执行；
// exports.default = series(html,parallel(js,css));//html依次执行，js/css同时执行；


//处理文件:采用流的方式输入输出;
// const { src, dest } = require('gulp');//src输入文件，dest输出文件
// //IO操作：input和output；比如：less -> css -> css加上css3前缀 -> 压缩 -> 输出
// const uglify = require("gulp-uglify");//导入压缩插件
// const rename = require("gulp-rename");//导入重命名文件的插件
// exports.default = function () {
//     return src('src/js/*.js')//匹配所有的js文件
//         .pipe(dest('dist/js'))//先输出一次未压缩版本
//         .pipe(uglify())//压缩
//         .pipe(rename({ extname: '.min.js' }))//重命名文件,模仿jq.min.js
//         .pipe(dest('dist/js'))//输出的目录
// }



// //文件监控：把引入的文件跟任务进行关联，热更新，类似-watch
// const {watch} = require("gulp");
// watch("src/css/*",{
//     //配置参数
//     delay:2000//热更新延迟多久
// },function (cb){
//     console.log("文件被修改了");
//     cb();
// })
















// //固定原文件夹名称
// var folder = {
//     src: 'src/',
//     dist: 'dist/'
// }

// //下面三个任务
// gulp.task("html", function () {
//     //创建取html文件任务,输出到dist文件下
//     //src文件夹中拿到html文件夹下的所有文件
//     gulp.src(folder.src + 'html/*')//输出文件
//         .pipe(gulp.dest(folder.dist + 'html/'))//传输文件,如果dist中没有html,创建它
// })
// gulp.task("css", function () {
//     gulp.src(folder.src + 'css/*')
//         .pipe(gulp.dest(folder.dist + 'css/'))//传输文件,如果dist中没有css,创建它

// })
// gulp.task("js", function () {
//     gulp.src(folder.src + 'js/*')
//         .pipe(gulp.dest(folder.dist + 'js/'))//传输文件,如果dist中没有css,创建它

// })

// //生成文件夹
// gulp.task('default',gulp.parallel('html','css','js',()=>{//parallel：可以并行计算

// }))




